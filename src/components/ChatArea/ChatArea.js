import React, { Component } from "react";
import "./ChatArea.sass";
import { getMessages, sendMessage, sendAudioMessage } from "../../api/api";
import ChatInput from "../ChatInput/ChatInput";

class ChatArea extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, chats: [] };
        this.lastMessageRef = null;
    }

    onSendText = async (message) => {
        const { currentUser, selectedUser } = this.props;
        const { status, data } = await sendMessage(currentUser.userName, selectedUser.userName, message);
        if (status === "SUCCESS")
            this.setState(prevState => ({ chats: prevState.chats.concat(data) }));
    };

    onSendVoice = async (url) => {
        const { currentUser, selectedUser } = this.props;
        const { status, data } = await sendAudioMessage(currentUser.userName, selectedUser.userName, url);
        if (status === "SUCCESS")
            this.setState(prevState => ({ chats: prevState.chats.concat(data) }));
    };

    async getChats(chatId) {
        try {
            const { data } = await getMessages(chatId)
            if (data && data.length) {
                this.setState({ loading: false, chats: [...data] });
            } else {
                this.setState({ loading: false, chats: [] });
            }
        } catch (err) {
            console.log(err);
        }
    }

    parseMessage = body => {
        const { type, data, from, createdOn } = body;
        const className = (from === this.props.currentUser.userName) ? "sent" : "received"
        switch (type) {
            case "TEXT":
                const userNameRe = /(@\S+)/g;
                return <div 
                    ref={ref => this.lastMessageRef = ref} 
                    key={createdOn} 
                    className={`${className} wrapper`}>
                    <div className="message">{
                        data.split(userNameRe).map((word, i) => {
                            return (userNameRe.test(word) && this.props.currentUser.contacts.find(contact => "@" + contact.userName === word)) ? <mark key={i}>{word}</mark> : word;
                        })
                    }</div>
                </div>
            case "AUDIO":
                return <div 
                    ref={ref => this.lastMessageRef = ref} 
                    key={createdOn} 
                    className={`${className} wrapper`}>
                    <audio src={data} preload="auto" controls />
                </div>;
            default:
                return null;
        }
    };

    componentDidMount() {
        this.getChats(this.props.selectedUser.chatId);
    }

    componentDidUpdate(prevProps) {
        if(this.lastMessageRef) {
            this.lastMessageRef.scrollIntoView();
        }
        if (prevProps.selectedUser.chatId === this.props.selectedUser.chatId)
            return;
        this.getChats(this.props.selectedUser.chatId);
    }

    render() {
        return <div className="chat-area">
            <div className="chat-view">
                {
                    this.state.chats.map(this.parseMessage)
                }
            </div>
            <ChatInput
                onSendText={this.onSendText}
                onSendVoice={this.onSendVoice}
            />
        </div>
    }
}

export default ChatArea;