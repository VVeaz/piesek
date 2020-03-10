import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import LogIn from "./LogIn"
import * as serviceWorker from "./serviceWorker";

import "./index.css";

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LogIn} />
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));
