import React from 'react';

export default class Post extends React.Component {
	constructor() {
		super();
		this.state = {
			post: []
		}
	}

	componentWillMount() {
		this.getFetch(this.props.params.postId);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.params.postId !== this.props.params.postId){
			this.getFetch(nextProps.params.postId);
		}
	}

	getFetch(postId) {
		fetch(`http://localhost:8080/api/${postId}`).then(r => r.json())
			.then((data) => {
				console.log('DATA POST: ', data)
				this.setState({post: data});
			})
			.catch((err) => {
				console.log(err);
			})
	}

    render() {
    	console.log('PROP TYPES: ', React.PropTypes);
        return (
            <div>
            	{this.props.params.postId}
                <h1>{this.state.post.author}</h1>
                <h1>{this.state.post.title}</h1>
                <h1>{this.state.post.text}</h1>
            </div>
        );
    }
}

//module.exports = Post