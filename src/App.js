import React, {Component} from "react";
import "./App.sass";
import Header from "./components/Header/Header";
import { getUser } from "./api/api";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
    constructor(props) {
        super(props);
        // TODO: change current user to null and handle login system.
        this.state = {loading: true, currentUser: null, selectedUser: null};
    }

    async componentDidMount() {
        const {data} = await getUser("ishan");
        this.setState({currentUser: data});
        this.onChangeSelectedUser(data.contacts[0].userName);
    }

    onChangeSelectedUser = async (userName) => {
        try {
            const {data} = await getUser(userName);
            this.setState({selectedUser: data});
        } catch(err) {
            console.log(err);
        }
    };

    render() {
        if(!this.state.currentUser || !this.state.selectedUser) return null;
        return <section className="App">
            <Header name={this.state.selectedUser.name}/>
            <div className="main">
                <ContactList 
                    contacts={this.state.currentUser.contacts} 
                    selectedUser={this.state.selectedUser}
                    onSelect={this.onChangeSelectedUser}/>
            </div>
        </section>;
    }
}

export default App;