import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid, Select } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class EditAccount extends Component {

    constructor(props) {
        super(props);
        this.roleOptions = [
            { key: 'u', text: 'Pracownik', value: 'USER' },
            { key: 'a', text: 'Admin', value: 'ADMINISTRATOR' }
        ]
        this.state = { email: '', name: '', lastName: '', role: '' }
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
        axios.get('http://localhost:8080/api/animal/1').then(function (response) {
            console.log(response.data);
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
        var self = this;
        let animal = {
            "id:": 1,   //id pobierane z linku przegladania
            "name": this.state.name,
            "weight": this.state.weight,
            "birthDate": this.state.birthDate,
            "description": this.state.description,
            "species": this.state.spicies,
            "pictureLocation": "string",
            "diseases": this.state.diseases,
            "birthDateApproximated": this.state.birthDateApproximated,
        }
        let data = JSON.stringify(animal)
        let formData = new FormData()
        const blob = new Blob([data], {
            type: 'application/json'
        });
        formData.append("animal", blob)
        formData.append("image", this.state.image)

        axios.put('http://localhost:8080/api/animal', formData, {
            'Content-Type': 'application/json',
        }).then(function (response) {
            self.setState({ success: true, error: false })
            console.log(response);
        }).catch(function (error) {
            self.setState({ error: true, success: false })
            console.log(error);
        });

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
                                                <input onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                            </Form.Field>
                                            <Form.Field style={{ marginRight: 75, marginLeft: 75 }}>
                                                <label style={{ marginTop: 15 }} >Nazwisko</label>
                                                <input onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                            </Form.Field>
                                            <Form.Field style={{ marginLeft: 75, marginRight: 75, width: 5 }}
                                                control={Select}
                                                options={this.roleOptions}
                                                placeholder='Rola'
                                            />
                                            <Form.Field style={{ marginRight: 75, marginLeft: 75 }}>
                                                <label >Data zatrudnienia</label>
                                                <input type="date" onChange={e => this.setState({ birthDate: e.target.value })} placeholder='' />

                                            </Form.Field>
                                            <Form.Field style={{ marginRight: 75, marginLeft: 75 }} >
                                                <label >E-mail</label>
                                                <input style={{ marginBottom: 15 }} onChange={e => this.setState({ spicies: e.target.value })} placeholder='' />
                                            </Form.Field>


                                        </div>
                                        <div align="right" style={{ marginTop: 10 }} >
                                            <button class="circular ui icon button" style={{ backgroundColor: "#FFABB6" }} type="reset" >
                                                <i class="minus icon"></i>
                                            </button>
                                            <label style={{ marginRight: 10 }} > Anuluj</label>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type='submit' >
                                                <i class="check icon"></i>
                                            </button>
                                            <label>Zapisz zmiany</label>
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
