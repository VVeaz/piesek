import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { image: null, diseases: [], pictureLocation: "", show: false, name: "", weight: "", birthDate: "", description: "", spicies: "", birthDateApproximated: false, permissons: false, success: false, error: false }
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

    appendDisease() {
        var newInput = `input-${this.state.diseases.length}`;
        var newStartDate = `startDate-${this.state.diseases.length}`;
        var newEndDate = `endDate-${this.state.diseases.length}`;
        var newDescription = `description-${this.state.diseases.length}`;
        var newDisease = (newInput, newStartDate, newEndDate, newDescription)
        this.setState(prevState => ({ diseases: prevState.diseases.concat([newDisease]) }));
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
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem z dodaniem zwierzęcia.</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ DO DODAWANIA ZWIERZĄT. <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9" }} >
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label style={{ marginTop: 15 }} >Imię i nazwisko</label>
                                                <input onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Rola</label>

                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Data urodzenia</label>
                                                <input type="date" onChange={e => this.setState({ birthDate: e.target.value })} placeholder='' />

                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }} >
                                                <label >E-mail</label>
                                                <input style={{ marginBottom: 15 }} onChange={e => this.setState({ spicies: e.target.value })} placeholder='' />
                                            </div>


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
