import React from 'react';
import {render} from 'react-dom';
import Posts from './Posts.jsx';
import PostDetailed from './PostDetailed.jsx';
import Post from './Post';
import {Link, Route, Router, browserHistory} from 'react';

render ((
    <Router history={browserHistory}>
        <Route path="/" component={Posts}>
            <Route path="/:postId" component={PostDetailed} />
        </Route>
    </Router>
), document.getElementById('example'));