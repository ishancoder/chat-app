import React, {Component} from "react";
import "./App.sass";
import Header from "./components/Header/Header";
import { getUser } from "./api/api";
import ContactList from "./components/ContactList/ContactList";
import ChatArea from "./components/ChatArea/ChatArea";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, currentUser: null, selectedUser: null};
        this.selectedIndex = 0;
    }

    async componentDidMount() {
        const {data} = await getUser("ishan");
        this.setState({currentUser: data});
        this.onChangeSelectedUser(data.contacts[this.selectedIndex].userName);
    }

    onChangeSelectedUser = async (userName) => {
        const {data} = await getUser(userName);
        const {chatId} = this.state.currentUser.contacts.find(contact => contact.userName === userName);
        this.setState({selectedUser: {...data, chatId}});
    };

    handleNavigation = ev => {
        const {key} = ev;
        const {contacts} = this.state.currentUser;
        switch(key) {
            case "ArrowUp":
                if(this.selectedIndex > 0) {
                    this.selectedIndex--;
                    this.onChangeSelectedUser(contacts[this.selectedIndex].userName);
                }
                break;
            case "ArrowDown":
                if(this.selectedIndex < contacts.length - 1) {
                    this.selectedIndex++;
                    this.onChangeSelectedUser(contacts[this.selectedIndex].userName);
                }
                break;
            default:
                break;
        }
    }; 

    render() {
        if(!this.state.currentUser || !this.state.selectedUser) return null;
        return <section className="App" tabIndex="0" onKeyUp={this.handleNavigation}>
            <Header name={this.state.selectedUser.name}/>
            <div className="main">
                <ContactList 
                    contacts={this.state.currentUser.contacts} 
                    selectedUser={this.state.selectedUser}
                    onSelect={this.onChangeSelectedUser}/>
                <ChatArea 
                    currentUser={this.state.currentUser} 
                    selectedUser={this.state.selectedUser}/>
            </div>
        </section>;
    }
}

export default App;