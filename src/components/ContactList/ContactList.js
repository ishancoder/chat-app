import React from "react";
import "./ContactList.sass";

function ContactList(props) {
    return <ul className="contact-list">
        {
            props.contacts.map(contact => {
                return <li 
                key={contact.chatId} 
                className={`${(props.selectedUser.userName===contact.userName)?"selected":""}`} 
                onClick={() => props.onSelect(contact.userName)}>
                    {contact.userName}
                </li>
            })
        }
    </ul>
}

export default ContactList;