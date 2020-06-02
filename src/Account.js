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
        this.state = { inputs: [], id: "0", show: false, name: "", lastName: "", role: "", email: "", createdDate: "", birthDateApproximated: false, permissons: false, success: false, error: false }
    }

    componentDidMount() {
        const { id } = this.props.match.params

        var self = this;
        axios.get('http://localhost:8080/api/role/my-permissions').then(function (response) {
            var perm;
            for (perm of response.data) {
                if (perm === "ROLE_MANAGE_PET_CATALOG") {
                    self.setState({ permissons: true })
                }
            }
        })
        //if (self.state.permissons == true) {
        axios.get('http://localhost:8080/api/user-account/' + id).then(function (response) {
            //console.log(response)
            self.setState({ id: response.data["id"], name: response.data["name"], lastName: response.data["lastName"], role: response.data["role"], email: response.data["email"], createdDate: response.data["createdDate"] })
        }).catch(function (error) {
            self.setState({ permissons: false })
            //console.log("PROBLEM!" + error)
        })
        //}
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
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udana edycja.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ. <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9", borderRadius: 15 }} >

                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Imię</label>
                                                <label style={{ color: "#918383" }}>{this.state.name}</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Nazwisko</label>
                                                <label style={{ color: "#918383" }}>{this.state.lastName}</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Rola</label>
                                                <label style={{ color: "#918383" }}>{this.state.role}</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label>Data zatrudnienia</label>
                                                <label style={{ color: "#918383" }}>{this.state.createdDate}</label>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }} >
                                                <label >E-mail</label>
                                                <label style={{ color: "#918383" }}>{this.state.email}</label>
                                            </div>
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
