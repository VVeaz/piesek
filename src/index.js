import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import LogIn from "./LogIn"
import RegistrationUser from "./RegistrationUser"
import "./index.css";
import history from './history';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

const routing = (
    <Router history={history}>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/RU" component={RegistrationUser} />
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));
