import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import LogIn from "./LogIn"
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import AppUnlogged from "./AppUnlogged";

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={AppUnlogged} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/logged" component={App} />
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));
