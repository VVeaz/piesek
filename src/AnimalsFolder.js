import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";
import AnimalTr from './AnimalTr';
import { request } from "https";

class AnimalsFolder extends Component {
    state = { animals: [], name: "", species: "", maxPage: 1, page: 0, size: 10, sort: "id%2Cdesc", update: false }

    componentDidMount() {
        var self = this;
        axios.get('http://localhost:8080/api/animal?name=' + self.state.name + '&species=' + self.state.species + '&page=' + self.state.page + '&size=' + self.state.size + '&sort=' + self.state.sort).then(function (response) {
            console.log(response)
            self.setState({ animals: response.data.content, maxPage: response.data.totalPages - 1 })
        })
    }

    componentDidUpdate() {
        if (this.state.update) {
            var self = this;
            axios.get('http://localhost:8080/api/animal?name=' + self.state.name + '&species=' + self.state.species + '&page=' + self.state.page + '&size=' + self.state.size + '&sort=' + self.state.sort).then(function (response) {
                console.log(response)
                self.setState({ animals: response.data.content, maxPage: response.data.totalPages - 1, update: false })
            })
        }

    }

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
                                            <AnimalTr animal={this.state.animals} />
                                        </tbody>

                                    </table>
                                    <div>
                                        <div style={{ float: "left" }}>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4", margin: "0px 10px 0px 10px" }} onClick={() => { if (this.state.page > 0) { this.setState({ page: this.state.page - 1, update: true }) } }}>
                                                <i class="arrow left icon"></i>
                                            </button>
                                            Strona {this.state.page + 1}
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4", margin: "0px 10px 0px 10px" }} onClick={() => { if (this.state.page < this.state.maxPage) { this.setState({ page: this.state.page + 1, update: true }) } }}>
                                                <i class="arrow right icon"></i>
                                            </button>
                                        </div>
                                        <div style={{ float: "right" }}>
                                            <label>Liczba rekordów: </label>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4" }} onClick={() => { this.setState({ size: 1, page: 0, update: true }) }}> 10</button>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4" }} onClick={() => { this.setState({ size: 2, page: 0, update: true }) }}> 25</button>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4" }} onClick={() => { this.setState({ size: 3, page: 0, update: true }) }}> 50</button>
                                        </div>
                                    </div>
                                    <br /> <br />
                                    <div align="right" style={{ marginTop: 10 }} >
                                        <Link to="/add-animal">
                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type="reset" >
                                                <i class="plus icon"></i>
                                            </button>
                                            <label>Dodaj zwierzę</label>
                                        </Link>
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </div>

                    </Grid.Column>

                </Grid>

            </div >


        );
    }
}
export default AnimalsFolder;


