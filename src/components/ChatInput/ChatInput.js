import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faMicrophone, faCircle } from "@fortawesome/free-solid-svg-icons";
import "./ChatInput.sass";

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "", isRecording: false };
        this.mediaRecorder = null;
        this.audioChunks = [];
    }

    async setupRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return;
        }
        const { onSendVoice } = this.props;
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(audioStream);
        } catch (err) {
            console.error(err.name, err.message);
            return;
        }
        this.mediaRecorder.ondataavailable = ev => this.audioChunks.push(ev.data);
        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.audioChunks);
            const url = URL.createObjectURL(blob);
            if (typeof onSendVoice === "function") {
                onSendVoice(url);
            }
            this.audioChunks = [];
        };
        this.mediaRecorder.onerror = err => console.error(err.name, err.message);
    }

    handleChange = ev => {
        this.setState({ text: ev.target.value });
    };

    handleRecord = async ev => {
        ev.preventDefault();
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !this.mediaRecorder) {
            return alert("Sorry! your device does not support audio recording.");
        }

        const {isRecording} = this.state;

        if (!isRecording) {
            this.mediaRecorder.start();
        } else {
            this.mediaRecorder.stop();
        }

        this.setState({ isRecording: !isRecording });
    };

    handleSend = ev => {
        ev.preventDefault();
        if (typeof this.props.onSendText === "function" && !!this.state.text) {
            this.props.onSendText(this.state.text);
            this.setState({ text: "" });
        }
    };

    componentDidMount() {
        this.setupRecording();
    }

    render() {
        const recordingIcon = (this.state.isRecording) ? faCircle : faMicrophone
        return <form className="chat-input">
            <input type="text" onChange={this.handleChange} placeholder="Message..." value={this.state.text} autoFocus/>
            <button onClick={this.handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
            <button onClick={this.handleRecord} className={(this.state.isRecording) ? "recording" : ""}>
                <FontAwesomeIcon icon={recordingIcon} />
            </button>
        </form>
    }
}

export default ChatInput;