import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class AnimalsFolder extends Component {

    render() {
        if (!axios.defaults.headers.common["Authorization"]) {
            return (<AppUnlogged />);
        }
        return (
            <div style={{ height: "100%" }}>
                <Grid style={{ height: "100%", padding: 0, margin: 0 }}>
                    <Grid.Column stretched width={2} style={{ padding: 0, margin: 0 }}>
                        <SideMenu />
                    </Grid.Column>
                    <Grid.Column stretched width={14}>
                        <div>
                            <h1>Katalog ze zwierzętami</h1>
                            <hr />
                            <Grid columns={2}>
                                <Grid.Column>

                                    <table class="ui sortable celled table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div class="ui category search">
                                                        <div class="ui icon input">
                                                            <input class="prompt" type="text" placeholder="Szukaj imienia..." />
                                                            <i class="search icon"></i>
                                                        </div>
                                                        <div class="results"></div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="ui category search">
                                                        <div class="ui icon input">
                                                            <input class="prompt" type="text" placeholder="Szukaj gatunku..." />
                                                            <i class="search icon"></i>
                                                        </div>
                                                        <div class="results"></div>
                                                    </div>
                                                </th>

                                            </tr>
                                            <tr>

                                                <th>Imię</th>

                                                <th>Gatunek</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Simba</td>
                                                <td>Lew</td>
                                            </tr>
                                            <tr>
                                                <td>Leszek</td>
                                                <td>Pies</td>
                                            </tr>
                                            <tr>
                                                <td>Misiek</td>
                                                <td>Kot</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    <Link to="/add-animal">
                                        <div align="right" style={{ marginTop: 10 }} >
                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type="reset" >
                                                <i class="plus icon"></i>
                                            </button>
                                            <label>Dodaj zwierzę</label>
                                        </div>
                                    </Link>

                                </Grid.Column>
                            </Grid>
                        </div>

                    </Grid.Column>

                </Grid>

            </div>


        );
    }
}
export default AnimalsFolder;


