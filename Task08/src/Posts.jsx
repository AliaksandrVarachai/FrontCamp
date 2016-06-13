import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';

class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api")
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                this.setState({posts: data})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <ul>
                {this.state.posts.map((post, index) => {
                    return <Post post={post} key={index} />
                })}
            </ul>
        )
    };
}

ReactDOM.render(<HelloWorld name="Dima"/>, document.getElementById('react'));


