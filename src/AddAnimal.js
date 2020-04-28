import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class AddAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false, name: "", weight: "", birthDate: "", description: "", spicies: "", birthDateApproximated: false, correct: false, success: false, error: false }
    }

    componentDidUpdate() {
        if (!this.state.correct && this.state.name.length > 0) {
            this.setState({ correct: true })
        }
        else if (this.state.correct && this.state.name.length == 0) {
            this.setState({ correct: false })
        }
    }

    onSubmit = e => {
        var self = this;
        axios.post('http://localhost:8080/api/animal', {
            "name": this.state.name,
            "weight": this.state.weight,
            "birthDate": this.state.birthDate,
            "description": this.state.description,
            "spicies": this.state.spicies,
            "birthDateApproximated": this.state.birthDateApproximated
        }).then(function (response) {
            self.setState({ success: true, error: false, correct: false, name: "" })
            console.log(response);
        }).catch(function (error) {
            self.setState({ error: true, correct: false })
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
                            <h1>Dodawanie zwierzęcia</h1>
                            <hr />
                            <Grid columns={3}>
                                <Grid.Column>
                                    <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Udane dodanie.</p>
                                    <p style={{ display: this.state.error ? "block" : "none", color: "red" }}>Problem z dodaniem zwierzęcia.</p>
                                    <Form onSubmit={this.onSubmit}>
                                        <div class="equal width fields">
                                            <label style={{ marginRight: 5 }}>Imię</label>
                                            <tr />
                                            <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder='' />
                                        </div>
                                        <div class="equal width fields">
                                            <label style={{ marginRight: 5 }}>Waga</label>
                                            <input type="number" value={this.state.weight} onChange={e => this.setState({ weight: e.target.value })} placeholder='' />
                                        </div>
                                        <div class="equal width fields">
                                            <label style={{ marginRight: 5 }}>Data urodzenia</label>
                                            <input type="date" value={this.state.birthDate} onChange={e => this.setState({ birthDate: e.target.value })} placeholder='' />
                                            <div style={{ marginLeft: 5 }} class="ui toggle checkbox">
                                                <input type="checkbox" tabindex="0" onClick={() => { this.setState({ birthDateApproximated: !this.state.birthDateApproximated }) }} />
                                                <label>Czy data przybliżona</label>
                                            </div>
                                        </div>
                                        <div class="equal width fields">
                                            <label style={{ marginRight: 5 }}>Gatunek</label>
                                            <input value={this.state.species} onChange={e => this.setState({ spicies: e.target.value })} placeholder='' />
                                        </div>
                                        <div >
                                            <label>Notatki</label>
                                            <textarea value={this.state.description} onChange={e => this.setState({ description: e.target.value })}></textarea>
                                        </div>
                                        <Button style={{ backgroundColor: "#CAE2FF" }} type='submit' >Dodaj nowe zwierzęcie</Button>
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
export default AddAnimal;

// function AccountSettings() {

//     return (
//         <div style={{ height: "100%" }}>
//             <Grid style={{ height: "100%", padding: 0, margin: 0 }}>
//                 <Grid.Column stretched width={2} style={{ padding: 0, margin: 0 }}>
//                     <SideMenu />
//                 </Grid.Column>
//                 <Grid.Column stretched width={14}>
//                     <div>
//                         <h1>Ustawienia konta</h1>
//                         <hr />
//                         <Grid columns={3}>
//                             <Grid.Column>
//                                 <div>
//                                     <Button style={{ backgroundColor: "#CAE2FF" }}
//                                         type='submit'>Zmień hasło</Button>
//                                 </div>
//                                 <Form id="asd" style={{ display: this.state.showStore ? 'block' : 'none' }}>form </Form>
//                                 <Button onclick={asd(1)}>Hide</Button>
//                                 <Button onclick={asd(2)}>Show</Button>

//                                 <h3><label> Damian Wnukowski</label></h3>
//                                 <h4><label>Email: damian.wnukowski@email.com</label></h4>

//                             </Grid.Column>
//                         </Grid>
//                     </div>
//                 </Grid.Column>
//             </Grid>
//         </div>
//     );
//     function asd(a) {
//         if (a == 1)
//             this.setState({ showStore: true });
//         else
//             this.setState({ showStore: false });
//     }
// }

// export default AccountSettings;
