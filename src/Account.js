import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid, Button } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";
import { Link } from 'react-router-dom'

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { inputs: [], show: false, name: "", weight: "", birthDate: "", description: "", spicies: "", birthDateApproximated: false, permissons: false, success: false, error: false }
    }

    componentDidMount() {
        var self = this;
        axios.get('http://localhost:8080/api/role/my-permissions').then(function (response) {
            var perm;
            for (perm of response.data) {
                if (perm === "ROLE_MANAGE_PET_CATALOG") {
                    self.setState({ permissons: true })
                }
            }
        })
    }

    onSubmit = e => {

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
                            <Link to="/accounts-folder">
                                <button class="ui labeled icon button">
                                    <i class="caret left icon"></i> Powrót do katalogu
                                    </button>
                            </Link>
                            <hr />

                            <Grid columns={4}>
                                <Grid.Column>
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udane dodanie.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem z dodaniem zwierzęcia.</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ DO DODAWANIA ZWIERZĄT. <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9", borderRadius: 15 }} >

                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Imię i nazwisko</label>
                                                <label style={{ color: "#918383" }}>Szymon Stasiak</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Rola</label>
                                                <label style={{ color: "#918383" }}>Wolontariusz</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label>Data zatrudnienia</label>
                                                <label style={{ color: "#918383" }}>25.09.2006</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }} >
                                                <label >E-mail</label>
                                                <label style={{ color: "#918383" }}>sstasiak@wp.pl</label>                                            </div>

                                        </div>
                                        <div align="right" style={{ marginTop: 10 }} >
                                            <button class="circular ui icon button" style={{ backgroundColor: "#FFABB6" }} type="reset" >
                                                <i class="minus icon"></i>
                                            </button>
                                            <label style={{ marginRight: 10 }} > Usuń konto</label>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type='submit' >
                                                <i class="check icon"></i>
                                            </button>
                                            <label>Edytuj konto</label>
                                        </div>
                                    </Form>

                                </Grid.Column>
                            </Grid>
                        </div>

                    </Grid.Column>

                </Grid>

            </div>

        );
    }
}
export default Account;
