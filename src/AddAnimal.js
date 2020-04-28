import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class AddAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false, name: "", weight: "", birthDate: "", spicies: "", correct: false, success: false, error: false }
    }



    render() {
        // if (!axios.defaults.headers.common["Authorization"]) {
        //     return (<AppUnlogged />);
        // }
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

                                    <Form onSubmit={this.onSubmit} >
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
                                            <input type="date" value={this.state.birthDate} onChange={e => this.setState({ passwordConfirm: e.target.birthDate })} placeholder='' />
                                            <div style={{ marginLeft: 5 }} class="ui toggle checkbox">
                                                <input type="checkbox" tabindex="0" />
                                                <label>Czy data przybliżona</label>
                                            </div>
                                        </div>
                                        <div class="equal width fields">
                                            <label style={{ marginRight: 5 }}>Gatunek</label>
                                            <input value={this.state.weight} onChange={e => this.setState({ spicies: e.target.value })} placeholder='' />
                                        </div>
                                        <div >
                                            <label>Notatki</label>
                                            <textarea></textarea>
                                        </div>
                                        <Button style={{ backgroundColor: "#CAE2FF" }} type='submit' >Zatwierdź nowe hasło</Button>
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
