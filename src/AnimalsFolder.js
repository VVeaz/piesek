import "semantic-ui-css/semantic.min.css";
//import SideMenu from "./components/SideMenu";
//import { Button, Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import axios from 'axios'
//import AppUnlogged from "./AppUnlogged";

class AnimalsFolder extends Component {

    render() {
        // if (!axios.defaults.headers.common["Authorization"]) {
        //     return (<AppUnlogged />);
        // }
        return (
            <Link to="/add-animal">
                <label>Dodaj zwierze</label>
            </Link>
        );
    }
}
export default AnimalsFolder;


