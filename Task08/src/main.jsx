import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            hello: "999"
        }
    }


    componentDidMount() {
        this.setState({
            hello: "heeeeelo"
        });
    }

    render() {
        return (
            <h1>{this.state.hello}</h1>
        );
    }
}

ReactDOM.render(<HelloWorld name="Dima"/>, document.getElementById('react'));


