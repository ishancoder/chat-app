import React from "react";
import "./Header.sass";
import AddUser from "../AddUser/AddUser";

function Header(props) {
    return <header className="header">
        <span>{props.name}</span>
        <AddUser addContact={props.addContact}/>
    </header>
}

export default Header;