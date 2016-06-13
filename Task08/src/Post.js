import React, { Component } from 'react';

export default class Post extends Component {
    render() {
        return (
            <li>
                zzzzzzzzzzzzzzzzzzzz
                <h1>{this.props.post.author}</h1>
                <h2>{this.props.post.title}</h2>
                <h3>{this.props.post.text}</h3>
            </li>
        )
    }
}

