import React from 'react';
import {HashRouter as Router, Switch, Route, HashRouter} from "react-router-dom"
import CreatePost from './Components/CreatePost';
import Home from "./Components/Home"
import EditPost from "./Components/EditPost"

export default function Routes() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/" exact component = {Home}/>
                <Route path="/createNewPost" exact component = {CreatePost}/>
                <Route path="/editPost/:postId" exact component = {EditPost}/>
            </Switch>
        </HashRouter>
    )
}