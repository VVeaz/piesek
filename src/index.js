import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import LogIn from "./LogIn"
import RegistrationUser from "./RegistrationUser"
import RegistrationAdmin from "./RegistrationAdmin"
import "./index.css";
import history from './history';
import axios from 'axios';
import AccountSettings from "./AccountSettings";
import AddAnimal from "./AddAnimal";
import EditAnimal from "./EditAnimal";
import Animal from "./Animal";
import EditAccount from "./EditAccount";
import Account from "./Account";
import AnimalsFolder from "./AnimalsFolder"
import AccountsFolder from "./AccountsFolder"

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

const routing = (
    <Router history={history}>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/register" component={RegistrationAdmin} />
            <Route path="/finish-create-user" component={RegistrationUser} />
            <Route path="/account-settings" component={AccountSettings} />
            <Route path="/animals-folder" component={AnimalsFolder} />
            <Route path="/add-animal" component={AddAnimal} />
            <Route path="/animal-edit/:id" component={EditAnimal} />
            <Route path="/animal/:id" component={Animal} />
            <Route path="/account/:id" component={Account} />
            <Route path="/account-edit/:id" component={EditAccount} />
            <Route path="/accounts-folder" component={AccountsFolder} />
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));
