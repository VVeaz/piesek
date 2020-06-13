import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Form, Grid } from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios'
import AppUnlogged from "./AppUnlogged";

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", name: "", lastName: "", show: false, currentPassword: "", password: "", passwordConfirm: "", correct: false, success: false, error: false }
    }

    onClick = e => {
        this.setState({
            show: !this.state.show,
            error: false,
            currentPassword: "",
            password: "",
            passwordConfirm: ""
        });
    };

    componentDidMount() {

        var self = this;
        axios.get('http://localhost:8080/api/role/my-permissions').then(function (response) {
            var perm;
            for (perm of response.data) {
                if (perm === "ROLE_MANAGE_OWN_ACCOUNT") {
                    self.setState({ permissons: true })
                }
            }
        }).catch(function (error) {
            self.setState({ permissons: false })
            //console.log("PROBLEM!" + error)
        })
        //if (self.state.permissons == true) {
        axios.get('http://localhost:8080/api/user-account/me').then(function (response) {
            //console.log(response)
            self.setState({ name: response.data["name"], lastName: response.data["lastName"], email: response.data["email"] })

        })
        //}
    }

    componentDidUpdate() {
        if (!this.state.correct && this.state.password.length > 7 && this.state.passwordConfirm.length > 7 && this.state.password === this.state.passwordConfirm) {
            this.setState({ correct: true })
        }
        else if (this.state.correct && this.state.password !== this.state.passwordConfirm) {
            this.setState({ correct: false })
        }
    }

    onSubmit = e => {
        var self = this;
        axios.post('http://localhost:8080/api/user-account/change-password', {
            "currentPassword": this.state.currentPassword,
            "password": this.state.password,
            "passwordConfirm": this.state.passwordConfirm
        }).then(function (response) {
            self.setState({ success: true, show: false, currentPassword: "", password: "", passwordConfirm: "", error: false, correct: false })
            //console.log(response);
        }).catch(function (error) {
            self.setState({ error: true, currentPassword: "", correct: false })
            //console.log(error);
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
                            <h1>Ustawienia konta</h1>
                            <hr />
                            <Grid columns={3}>
                                <Grid.Column>
                                    <div style={{ display: this.state.show ? "none" : "block" }}>
                                        <br />
                                        <Button onClick={this.onClick} style={{ backgroundColor: "#CAE2FF" }}
                                            type='submit'>Zmień hasło</Button>
                                    </div>
                                    <h3 style={{ display: this.state.show ? "block" : "none" }}>Zmiana hasła</h3>
                                    <p style={{ display: this.state.error && this.state.show ? "block" : "none", color: "red" }}>Niezgodność: Nie udało się zmienić hasła...</p>

                                    <Form onSubmit={this.onSubmit} style={{ display: this.state.show ? "block" : "none" }}>
                                        <label>Stare hasło</label>
                                        <Form.Input type="password" value={this.state.currentPassword} onChange={e => this.setState({ currentPassword: e.target.value })}>
                                            <input placeholder='' />
                                        </Form.Input>
                                        <label>Nowe hasło</label>
                                        <Form.Input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}>
                                            <input placeholder='' />
                                        </Form.Input>
                                        <label>Potwierdź nowe hasło</label>
                                        <Form.Input type="password" value={this.state.passwordConfirm} onChange={e => this.setState({ passwordConfirm: e.target.value })} >
                                            <input placeholder='' />
                                        </Form.Input>
                                        <Button style={{ backgroundColor: "#CAE2FF" }} type='submit' disabled={!this.state.correct} >Zatwierdź nowe hasło</Button>
                                        <div style={{ display: this.state.show ? "block" : "none" }}>
                                            <br />
                                            <Button onClick={this.onClick} style={{ backgroundColor: "#CAE2FF" }}
                                                type='reset'>Anuluj</Button>
                                        </div>
                                    </Form>
                                    <div style={{ display: this.state.show ? "none" : "block" }}>
                                        <br />
                                        <h3><label> {this.state.name} {this.state.lastName}</label></h3>
                                        <h4><label>Email: {this.state.email}</label></h4>
                                        <br />
                                        <p style={{ display: this.state.success ? "block" : "none", color: "green" }}>Zmiana hasła zakończona sukcesem!!</p>
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
export default AccountSettings;

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
