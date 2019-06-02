import React, {Component} from "react";
import "./AddUser.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", isOpen: false};
    }

    handleChange = ev => {
        this.setState({text: ev.target.value});
    };

    handleSubmit = ev => {
        ev.preventDefault();
        if(typeof this.props.addContact === "function" && this.state.text) {
            this.props.addContact(this.state.text);
            this.setState({text: ""});
        }
    };

    handleToggle = ev => {
        ev.preventDefault();
        this.setState(prevState => ({isOpen: !prevState.isOpen}));
    };

    render() {
        const {isOpen} = this.state;
        return <div className="add-user-form" onSubmit={this.handleSubmit}>
            <button 
                className={(isOpen) ? "close" : ""} 
                onClick={this.handleToggle}>
                    <FontAwesomeIcon icon={faPlus}/>
            </button>
            <form className={`${(isOpen) ? "open": ""} inputs`}>
                <input 
                    type="text" 
                    placeholder="Type to add user" 
                    value={this.state.text} 
                    onChange={this.handleChange}/>
                <button type="submit"><FontAwesomeIcon icon={faUser}/></button>
            </form>
        </div>
    }
}

export default AddUser;