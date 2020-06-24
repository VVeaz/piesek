import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid, Select } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";
import { Link } from 'react-router-dom'

class EditAccount extends Component {

    constructor(props) {
        super(props);
        this.roleOptions = [
            { key: 'u', text: 'Pracownik', value: 'USER' },
            { key: 'a', text: 'Admin', value: 'ADMINISTRATOR' }
        ]
        this.state = { id: 0, email: '', name: '', lastName: '', role: '' }
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
        axios.get('http://localhost:8080/api/user-account/' + id).then(function (response) {
            console.log(response)
            self.setState({ id: response.data["id"], name: response.data["name"], lastName: response.data["lastName"], role: response.data["role"], email: response.data["email"], createdDate: response.data["createdDate"].substring(0, 10) })

        }).catch(function (error) {
            self.setState({ permissons: false })
            //console.log("PROBLEM!" + error)
        })
    }
    inputChangeHandler(e, name, value) {
        if (name === 'role') {
            this.state[name] = value;
        } else {
            this.state[name] = e.target.value;
        }
    }
    onSubmit = e => {
        // console.log(this.state.id)
        axios.patch('http://localhost:8080/api/user-account', {
            "id": this.state.id,
            "name": this.state.name,
            "lastName": this.state.lastName,
            "role": this.state.role
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            //self.setState({ permissons: false })
            console.log("PROBLEM!" + error)
        })

        // let animal = {
        //     "id": 0,
        //     "name": this.state.name,
        //     "lastName": this.state.lastName,
        //     "role": this.state.role
        // }

        // let data = JSON.stringify(animal)
        // let formData = new FormData()
        // const blob = new Blob([data], {
        //     type: 'application/json'
        // });
        // formData.append("animal", blob)

        // axios.patch('http://localhost:8080/api/user-account', animal, {
        //     'Content-Type': 'application/json',
        // }).then(function (response) {
        //     console.log(response);
        // }).catch(function (error) {
        //     console.log(error);
        // });
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
                            <h1>Edytowanie konta</h1>
                            <hr />
                            <Grid columns={4}>
                                <Grid.Column>
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udane dodanie.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem .</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ . <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9", borderRadius: 15 }} >

                                            <Form.Field style={{ marginRight: 75, marginLeft: 75 }}>
                                                <label style={{ marginTop: 15 }} >Imię</label>
                                                <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                            </Form.Field>
                                            <Form.Field style={{ marginRight: 75, marginLeft: 75 }}>
                                                <label style={{ marginTop: 15 }} >Nazwisko</label>
                                                <input value={this.state.lastName} onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                            </Form.Field>
                                            <Form.Field style={{ marginBottom: 10, marginLeft: 75, marginRight: 75, width: 5 }}
                                                control={Select}
                                                options={this.roleOptions}
                                                placeholder='Rola'
                                            />
                                            {/* <Form.Field style={{ marginRight: 75, marginLeft: 75 }}>
                                                <label >Data zatrudnienia</label>
                                                <input type="date" onChange={e => this.setState({ birthDate: e.target.value })} placeholder='' />

                                            </Form.Field>
                                            <Form.Field style={{ marginRight: 75, marginLeft: 75 }} >
                                                <label >E-mail</label>
                                                <input value={this.state.email} style={{ marginBottom: 15 }} onChange={e => this.setState({ spicies: e.target.value })} placeholder='' />
                                            </Form.Field> */}


                                        </div>
                                        <div align="right" style={{ marginTop: 10 }} >
                                            <Link to={"/account/" + this.props.match.params.id}>
                                                <button class="circular ui icon button" style={{ backgroundColor: "#FFABB6" }} type="reset" >
                                                    <i class="minus icon"></i>
                                                </button>
                                            </Link>
                                            <label style={{ marginRight: 10 }} > Anuluj</label>

                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type='submit' >
                                                <i class="check icon"></i>
                                            </button>
                                            <label >Zapisz zmiany</label>
                                        </div>
                                    </Form>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid>
            </div >
        );
    }
}
export default EditAccount;
