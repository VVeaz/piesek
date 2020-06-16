import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";
import AccountTr from './AccountTr';

class AccountsFolder extends Component {
    state = { animals: [], name: "", lastName: "", role: "", email: "", maxPage: 1, page: 0, size: 10, sort: "id%2Cdesc", update: false }

    componentDidMount() {
        var self = this;
        axios.get('http://localhost:8080/api/user-account?name=' + self.state.name + '&lastName=' + self.state.lastName + '&email=' + self.state.email + '&role=' + self.state.role + '&page=' + self.state.page + '&size=' + self.state.size + '&sort=' + self.state.sort).then(function (response) {
            // console.log(response)
            self.setState({ animals: response.data.content, maxPage: response.data.totalPages - 1 })
        })
    }

    componentDidUpdate() {
        if (this.state.update) {
            var self = this;
            axios.get('http://localhost:8080/api/user-account?name=' + self.state.name + '&lastName=' + self.state.lastName + '&email=' + self.state.email + '&role=' + self.state.role + '&page=' + self.state.page + '&size=' + self.state.size + '&sort=' + self.state.sort).then(function (response) {
                // console.log(response)
                self.setState({ animals: response.data.content, maxPage: response.data.totalPages - 1, update: false })
            })
        }

    }

    sortByName() {
        if (this.state.sort == "name%2Casc")
            this.setState({ sort: "name%2Cdesc", update: true })
        else
            this.setState({ sort: "name%2Casc", update: true })
    }

    sortByLastName() {
        if (this.state.sort == "lastname%2Casc")
            this.setState({ sort: "lastName%2Cdesc", update: true })
        else
            this.setState({ sort: "lastName%2Casc", update: true })
    }

    sortByRole() {
        if (this.state.sort == "role%2Casc")
            this.setState({ sort: "role%2Cdesc", update: true })
        else
            this.setState({ sort: "role%2Casc", update: true })
    }

    sortByEmail() {
        if (this.state.sort == "email%2Casc")
            this.setState({ sort: "email%2Cdesc", update: true })
        else
            this.setState({ sort: "email%2Casc", update: true })
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
                            <h1>Zarządzaj kontami</h1>
                            <hr />
                            <Grid columns={2}>
                                <Grid.Column>
                                    <table class="ui sortable celled table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div class="ui category search">
                                                        <div class="ui icon input">
                                                            <input class="prompt" type="text" placeholder="Szukaj imienia..." onChange={e => this.setState({ name: e.target.value, update: true })} />
                                                            <i class="search icon"></i>
                                                        </div>
                                                        <div class="results"></div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="ui category search">
                                                        <div class="ui icon input">
                                                            <input class="prompt" type="text" placeholder="Szukaj nazwiska..." onChange={e => this.setState({ lastName: e.target.value, update: true })} />
                                                            <i class="search icon"></i>
                                                        </div>
                                                        <div class="results"></div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="ui category search">
                                                        <div class="ui icon input">
                                                            <input class="prompt" type="text" placeholder="Szukaj roli..." onChange={e => this.setState({ role: e.target.value, update: true })} />
                                                            <i class="search icon"></i>
                                                        </div>
                                                        <div class="results"></div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="ui category search">
                                                        <div class="ui icon input">
                                                            <input class="prompt" type="text" placeholder="Szukaj e-maila..." onChange={e => this.setState({ email: e.target.value, update: true })} />
                                                            <i class="search icon"></i>
                                                        </div>
                                                        <div class="results"></div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th onClick={() => { this.sortByName() }}>Imię</th>
                                                <th onClick={() => { this.sortByLastName() }}>Nazwisko</th>
                                                <th onClick={() => { this.sortByRole() }}>Rola</th>
                                                <th onClick={() => { this.sortByEmail() }}>E-mail</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <AccountTr accounts={this.state.animals} />
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
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4" }} onClick={() => { this.setState({ size: 10, page: 0, update: true }) }}> 10</button>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4" }} onClick={() => { this.setState({ size: 25, page: 0, update: true }) }}> 25</button>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#d4d4d4" }} onClick={() => { this.setState({ size: 50, page: 0, update: true }) }}> 50</button>
                                        </div>
                                    </div>
                                    <br /> <br />
                                    <div align="right" style={{ marginTop: 10 }} >
                                        <Link to="/register">
                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }}  >
                                                <i class="plus icon"></i>
                                            </button>
                                        </Link>
                                        <label>Dodaj konto</label>

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
export default AccountsFolder;


