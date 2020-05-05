import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class EditAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = { diseases: [], show: false, name: "", weight: "", birthDate: "", description: "", spicies: "", birthDateApproximated: false, permissons: false, success: false, error: false }
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
                            <h1>Edycja zwierzęcia</h1>
                            <hr />
                            <Grid columns={2}>
                                <Grid.Column>
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udane dodanie.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem z dodaniem zwierzęcia.</p>
                                    <p style={{ display: !this.state.permissons ? "block" : "none" }}> NIE POSIADASZ UPRAWNIŃ DO DODAWANIA ZWIERZĄT. <br /> Wróć gdy otrzymasz taki przywilej. </p>
                                    <Form style={{ display: this.state.permissons ? "block" : "none" }} onSubmit={this.onSubmit}>
                                        <div style={{ backgroundColor: "#E9E9E9" }} >


                                            <i class="camera icon" />
                                            <input type="file" style={{ width: 237 }} />
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Imię</label>
                                                <input onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Waga</label>
                                                <input type="number" onChange={e => this.setState({ weight: e.target.value })} placeholder='' />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label >Data urodzenia</label>
                                                <input type="date" onChange={e => this.setState({ birthDate: e.target.value })} placeholder='' />
                                                <div style={{ marginTop: 5 }} class="ui toggle checkbox">
                                                    <input type="checkbox" tabindex="0" onClick={() => { this.setState({ birthDateApproximated: !this.state.birthDateApproximated }) }} />
                                                    <label>Czy data przybliżona</label>
                                                </div>
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }} >
                                                <label >Gatunek</label>
                                                <input onChange={e => this.setState({ spicies: e.target.value })} placeholder='' />
                                            </div>
                                            <div class="inline field" align="right" style={{ marginRight: 75 }}>
                                                <label>Choroby</label>
                                                <div class="ui list">
                                                    {/* spoko by bylo gdyby tu jakos w petli wyswietlic choroby ktore 
                                                    juz zwierze ma (w sensie by w inputach sie pokazaly by moc
                                                    je ewentualnie edytowac) */}
                                                    <a class="item">
                                                        <div class="content">
                                                            <div class="inline field" align="right" style={{ marginLeft: 75 }}>

                                                                <i class="heartbeat icon"></i>
                                                                <label style={{ marginRight: 15 }}>Nazwa</label>
                                                                <input />
                                                                <label style={{ marginRight: 15 }}>Rozpoczęcie choroby</label>
                                                                <input type="date" />
                                                                <label style={{ marginRight: 15 }}>Zakończenie choroby</label>
                                                                <input type="date" />
                                                                <label >Opis choroby</label>
                                                                <textarea />
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a class="item">
                                                        <div class="content">
                                                            <div class="inline field">
                                                                <div class="inline field" id="dynamicInput">
                                                                    <i class="ambulance icon"></i>
                                                                    {/* {this.state.inputs.map(input => <input key={input} />)}
                                                                    {this.state.startDates.map(input => <input type="date" key={input} />)}
                                                                    {this.state.endDates.map(input => <input type="date" key={input} />)} */}
                                                                    {this.state.diseases.map((index) => {
                                                                        return (
                                                                            <div class="inline field" style={{ marginLeft: 75 }}>
                                                                                <i class="heartbeat icon"></i>
                                                                                <label style={{ marginRight: 15 }}>Nazwa</label>
                                                                                <input key={index} />
                                                                                <label style={{ marginRight: 15 }}>Rozpoczęcie choroby</label>
                                                                                <input type="date" key={index} />
                                                                                <label style={{ marginRight: 15 }}>Zakończenie choroby</label>
                                                                                <input type="date" key={index} />
                                                                                <label >Opis choroby</label>
                                                                                <textarea key={index} />
                                                                            </div>
                                                                        )
                                                                    })}

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </a>
                                                    <button class="ui basic button" onClick={() => this.appendDisease()}>
                                                        <i class="medkit icon"></i>
                                                        Naciśnij by dodać kolejną chorobę
                                                            </button>


                                                </div>
                                            </div>
                                            <div class="inline field" style={{ marginRight: 50, marginLeft: 50, }}>
                                                <label>Notatki</label>
                                                <textarea style={{ marginBottom: 50, }} onChange={e => this.setState({ description: e.target.value })}></textarea>
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
