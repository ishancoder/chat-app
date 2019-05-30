import React, {Component} from "react";
import "./App.sass";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false};
    }
    render() {
        return <section className="App">
            Hello
        </section>;
    }
}

export default App;