import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";
import { Link } from 'react-router-dom'

class EditAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = { image: null, diseases: [], pictureLocation: "", show: false, name: "", weight: "", birthDate: "", description: "", species: "", birthDateApproximated: false, permissons: false, success: false, error: false, addDisease: false, diseaseId: null, diseaseStartDate: null, diseasesEndDate: null, diseaseName: null, diseaseDescription: null }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        var ifbirthDateApproximated

        var self = this;
        axios.get('http://localhost:8080/api/role/my-permissions').then(function (response) {
            var perm;
            for (perm of response.data) {
                if (perm === "ROLE_MANAGE_PET_CATALOG") {
                    self.setState({ permissons: true })
                }
            }
        })

        axios.get('http://localhost:8080/api/animal/' + id).then(function (response) {
            console.log(response)
            self.setState({
                id: response.data["id"],
                name: response.data["name"],
                weight: response.data["weight"],
                birthDate: response.data["birthDate"].substring(0, 10),
                description: response.data["description"],
                species: response.data["species"],
                birthDateApproximated: response.data["birthDateApproximated"],
                pictureLocation: response.data["pictureLocation"],
                diseases: response.data["diseases"]
            })
            if (self.state.diseases.length > 0) {
                self.setState({
                    addDisease: true,
                    diseaseStartDate: self.state.diseases[0]["startDate"],
                    diseasesEndDate: self.state.diseases[0]["endDate"],
                    diseaseName: self.state.diseases[0]["name"],
                    diseaseDescription: self.state.diseases[0]["description"]
                })
            }
            console.log(self.state.diseaseStartDate)
        }).catch(function (error) {
            self.setState({ permissons: false })
            //console.log("PROBLEM!" + error)
        })

        this.forceUpdate()
    }

    componentDidUpdate() {
    }

    onSubmit = e => {
        var self = this;
        // console.log("DIS: " + this.state.diseases)
        let animal
        if (this.state.addDisease) {
            animal = {
                "id": this.state.id,
                "name": this.state.name,
                "weight": this.state.weight,
                "birthDate": this.state.birthDate,
                "description": this.state.description,
                "species": this.state.spicies,
                "pictureLocation": "string",
                "birthDateApproximated": this.state.birthDateApproximated,
                "diseases": [
                    {
                        "startDate": this.state.diseaseStartDate,
                        "endDate": this.state.diseasesEndDate,
                        "name": this.state.diseaseName,
                        "description": this.state.diseaseDescription
                    }
                ],
            }
        } else {
            animal = {
                "name": this.state.name,
                "weight": this.state.weight,
                "birthDate": this.state.birthDate,
                "description": this.state.description,
                "species": this.state.spicies,
                "pictureLocation": "string",
                "birthDateApproximated": this.state.birthDateApproximated,
                "diseases": this.state.diseases,
            }
        }
        let data = JSON.stringify(animal)
        let formData = new FormData()
        const blob = new Blob([data], {
            type: 'application/json'
        });
        formData.append("animal", blob)
        if (this.state.image != null) {
            console.log("123 " + this.state.image)
            formData.append("image", this.state.image)
        }

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
        const start = "123" // this.state.diseaseStartDate.split(' ')[0]
        return (
            <div style={{ height: "100%" }}>
                <Grid style={{ height: "100%", padding: 0, margin: 0 }}>
                    <Grid.Column stretched width={2} style={{ padding: 0, margin: 0 }}>
                        <SideMenu />
                    </Grid.Column>
                    <Grid.Column stretched width={14}>
                        <div>
                            <h1>Edycja zwierzęcia</h1>
                            <hr />
                            <Grid columns={2}>
                                <Grid.Column>
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udane dodanie.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem z dodaniem zwierzęcia.</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ DO DODAWANIA ZWIERZĄT. <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9", borderRadius: 15 }} >
                                            <i class="camera icon" />
                                            <input type="file" style={{ width: 237 }} onChange={e => this.setState({ image: e.target.files[0] })} />
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Imię</label>
                                                <input onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Waga</label>
                                                <input type="number" onChange={e => this.setState({ weight: e.target.value })} value={this.state.weight} />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Data urodzenia</label>
                                                <input type="date" onChange={e => this.setState({ birthDate: e.target.value })} value={this.state.birthDate} />
                                                <div style={{ marginTop: 5 }} class="ui toggle checkbox">
                                                    {/* {() => {
                                                        if (this.state.birthDateApproximated) {
                                                            return <input type="checkbox" tabindex="0" onClick={() => { this.setState({ birthDateApproximated: !this.state.birthDateApproximated }) }} />
                                                        } else {
                                                            return <input type="checkbox" tabindex="0" onClick={() => { this.setState({ birthDateApproximated: !this.state.birthDateApproximated }) }} />
                                                        }
                                                    }} */}
                                                    <input type="checkbox" tabindex="0" defaultChecked={this.state.birthDateApproximated} onClick={() => { this.setState({ birthDateApproximated: !this.state.birthDateApproximated }) }} />
                                                    <label>Czy data przybliżona</label>
                                                </div>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }} >
                                                <label >Gatunek</label>
                                                <input onChange={e => this.setState({ spicies: e.target.value })} value={this.state.species} />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label>Choroby</label>
                                                <div class="ui list">
                                                    {/* spoko by bylo gdyby tu jakos w petli wyswietlic choroby ktore 
                                                    juz zwierze ma (w sensie by w inputach sie pokazaly by moc
                                                    je ewentualnie edytowac) */}
                                                    <a class="item">
                                                        <div class="content">
                                                            <div class="inline field">
                                                                <div class="inline field" id="dynamicInput">
                                                                    <i class="ambulance icon"></i>
                                                                    <div class="inline field" style={{ marginLeft: 75, display: this.state.addDisease ? "block" : "none" }}>
                                                                        <i class="heartbeat icon"></i>
                                                                        <label style={{ marginRight: 15 }}>Nazwa</label>
                                                                        <input value={this.state.diseaseName} onChange={e => this.setState({ diseaseName: e.target.value })} /><br />
                                                                        <label style={{ marginRight: 15 }}>Rozpoczęcie choroby</label>
                                                                        <input type="date" value={this.state.diseaseStartDate} onChange={e => this.setState({ diseaseStartDate: e.target.value })} /><br />
                                                                        <label style={{ marginRight: 15 }}>Zakończenie choroby</label>
                                                                        <input type="date" value={this.state.diseaseEndDate} onChange={e => this.setState({ diseasesEndDate: e.target.value })} /><br />
                                                                        <label >Opis choroby</label>
                                                                        <textarea value={this.state.diseaseDescription} onChange={e => this.setState({ diseaseDescription: e.target.value })} />
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </a>
                                                    <button class="ui basic button" style={{ display: !this.state.addDisease ? "block" : "none" }} onClick={() => (this.setState({ addDisease: !this.state.addDisease }))} type="button">
                                                        <i class="medkit icon"></i>
                                                        Naciśnij by dodać chorobę
                                                            </button>
                                                </div>
                                            </div>
                                            <div class="inline field" style={{ marginRight: 50, marginLeft: 50, }}>
                                                <label>Notatki</label>
                                                <textarea style={{ marginBottom: 50, }} onChange={e => this.setState({ description: e.target.value })} value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <div align="right" style={{ marginTop: 10 }} >
                                            <Link to={"/animal/" + this.props.match.params.id}>
                                                <button class="circular ui icon button" style={{ backgroundColor: "#FFABB6" }} type="reset" >
                                                    <i class="minus icon"></i>
                                                </button>

                                                <label style={{ marginRight: 10 }} > Anuluj</label>
                                            </ Link>
                                            <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type='submit' >
                                                <i class="check icon"></i>
                                            </button>
                                            <label>Zapisz zwierzę</label>

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
export default EditAnimal;
