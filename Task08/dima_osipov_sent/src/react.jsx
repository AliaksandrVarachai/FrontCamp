import React from 'react';
import {render} from 'react-dom';
import Posts from './Posts';
import Post from './Post';
import { Link, Route, Router, browserHistory } from 'react-router'


render((
	<Router history={browserHistory}>
		<Route path="/" component={Posts}>
			<Route path="/:postId" component={Post} />
		</Route>
	</Router>
), document.getElementById('react'));