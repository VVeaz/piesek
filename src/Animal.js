import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'


class Animal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "", inputs: [], id: "0", show: false, name: "", weight: "", birthDate: "", description: "", species: "", birthDateApproximated: false, diseases: [{
                "id": 0,
                "startDate": "",
                "endDate": "",
                "name": "",
                "description": ""
            }], permissons: false, success: false, error: false, exact: "Przybliżona"
        }
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
                diseases: response.data["diseases"],
                image: response.data["pictureLocation"]
            })
            if (self.state.diseases.length > 0) {
                self.setState({
                    diseases: [{
                        "id": 0,
                        "startDate": self.state.diseases[0]["startDate"].substring(0, 10),
                        "endDate": self.state.diseases[0]["endDate"].substring(0, 10),
                        "name": self.state.diseases[0]["name"],
                        "description": self.state.diseases[0]["description"]
                    }]
                })
            }
            console.log("-------------")
            console.log(self.state.diseases)
            ifbirthDateApproximated = self.state.birthDateApproximated
            if (ifbirthDateApproximated === false) {
                console.log(self.state.birthDateApproximated)
                // this.exactDate = "Dokładna"
                self.setState({ exact: "Dokładna" })
            }
        }).catch(function (error) {
            self.setState({ permissons: false })
            //console.log("PROBLEM!" + error)

        })

    }

    onSubmit = e => {
    }

    onDelete = e => {
        const { id } = this.props.match.params
        // console.log(id)
        var self = this
        axios.delete('http://localhost:8080/api/animal/' + id).then(function (response) {
            // console.log(response)
            self.setState({ success: true, permissons: false })
        })
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
                            <Link to="/animals-folder">
                                <button class="ui labeled icon button">
                                    <i class="caret left icon"></i> Powrót do katalogu
                                    </button>
                            </Link>
                            <hr />

                            <Grid columns={2}>
                                <Grid.Column>
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udane usunuęcie zwierzęcia z bazy.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem z dodaniem zwierzęcia.</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ DO DODAWANIA ZWIERZĄT. <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9", borderRadius: 15 }} >
                                            <Grid columns={2}>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <i class="camera icon" />

                                                        <img src={this.state.image} alt="Brak zdjęcia"></img>
                                                    </Grid.Column>
                                                    <Grid.Column>

                                                        <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                            <label >Imię</label>
                                                            <label style={{ color: "#918383" }}>{this.state.name}</label>
                                                        </div>
                                                        <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                            <label >Waga</label>
                                                            <label style={{ color: "#918383" }}>{this.state.weight}</label>
                                                        </div>
                                                        <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                            <label >Data urodzenia</label>
                                                            <label style={{ color: "#918383" }}>{this.state.birthDate}</label>
                                                            <tr />

                                                            <label style={{ color: "#918383" }}>{this.state.exact}</label>
                                                        </div>
                                                        <div class="inline field" align="right" style={{ marginRight: 75 }} >
                                                            <label >Gatunek</label>
                                                            <label style={{ color: "#918383" }}>{this.state.species}</label>                                           </div>
                                                        <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                            <label>Ostatnia choroba</label>
                                                            {this.state.diseases.length > 0 &&
                                                                <div class="ui list" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                    <a class="item" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                        <div class="content" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                            <div class="inline field" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                                <i class="heartbeat icon" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}></i>
                                                                                <label>{this.state.diseases[0]["name"]}</label>
                                                                            </div>
                                                                            <div class="inline field " style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                                <label style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>Początek choroby</label>
                                                                                <label style={{ color: "#918383" }}>{this.state.diseases[0]["startDate"]}</label>
                                                                            </div>
                                                                            <div class="inline field" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                                <label style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>Koniec choroby</label>
                                                                                <label style={{ color: "#918383" }}>{this.state.diseases[0]["endDate"]}</label>
                                                                            </div>
                                                                            <div class="inline field" style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>
                                                                                <label style={{ display: this.state.diseases.length == 0 ? "none" : "block" }}>Opis choroby</label>
                                                                                <label style={{ color: "#918383" }}>{this.state.diseases[0]["description"]}</label>
                                                                            </div>
                                                                        </div>
                                                                    </a>


                                                                </div>
                                                            }
                                                            <label style={{ display: this.state.diseases.length > 0 ? "none" : "block" }}>Brak chorób</label>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            <div class="inline field" style={{ marginRight: 50, marginLeft: 50, }}>
                                                <label>Notatki</label>
                                                <label style={{ color: "#918383", marginBottom: 20 }}>{this.state.description}</label>                                            </div>
                                        </div>
                                        <div align="right" style={{ marginTop: 10 }} >

                                            <button class="circular ui icon button" style={{ backgroundColor: "#FFABB6" }} type="button" onClick={this.onDelete}>
                                                <i class="minus icon"></i>
                                            </button>

                                            <label style={{ marginRight: 10 }} > Usuń zwierzę</label>
                                            <Link to={"/animal-edit/" + this.props.match.params.id}>
                                                <button class="circular ui icon button" style={{ backgroundColor: "#B2E8C4" }} type='button'>
                                                    <i class="check icon"></i>
                                                </button>
                                                <label>Edytuj zwierzę</label>
                                            </Link>
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
export default Animal;
