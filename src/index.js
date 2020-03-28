import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import LogIn from "./LogIn"
import * as serviceWorker from "./serviceWorker";
import axios from 'axios';
import "./index.css";
import AppUnlogged from "./AppUnlogged";
import RegistrationAdmin from "./RegistrationAdmin";

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={AppUnlogged} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/logged" component={App} />
            <Route exact path="/register" component={RegistrationAdmin} />
        </div>
    </Router>
)

axios.defaults.baseURL = 'localhost:8080/api/';
ReactDOM.render(routing, document.getElementById('root'));
