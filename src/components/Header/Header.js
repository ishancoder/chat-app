import React from "react";
import "./Header.sass";

function Header(props) {
    return <header className="header">
        {props.name}
    </header>
}

export default Header;