import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import {Link, Route, Router, browserHistory} from 'react';

class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/${postId}")
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                console.log('***********');
                var x = this.props.param.postId;

                this.setState({posts: [data[1]]})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentWillReceiveProps(props) {
        var x = props.params.postId;
        console.log(x);
        fetch(`http://localhost:8080/api/${x}`)
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                console.log('***********');
                //var x = this.props.param.postId;
x
                this.setState({posts: data})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        console.log(post);
        return (
            <div>
                {this.state.posts.map((post, index) => {
                    return
                        <Link to={`/${index}`} key={index}>{post.title}</Link>
                    })}
            </div>
        )
    };
}

ReactDOM.render(<HelloWorld name="Dima"/>, document.getElementById('react'));


