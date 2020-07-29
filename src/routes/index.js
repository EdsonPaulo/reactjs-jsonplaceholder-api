import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/PostList';
import Post from '../pages/PostArticle';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/posts/:id" component={Post} />
                <Route path="/users/:id" component={Post} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;