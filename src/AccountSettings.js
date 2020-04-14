import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Select, Form, Grid } from "semantic-ui-react";
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false }
    }
    onClick = e => {

        this.setState({
            show: !this.state.show
        });
    };
    render() {
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
                                        <Button onClick={this.onClick} style={{ backgroundColor: "#CAE2FF" }}
                                            type='submit'>Zmień hasło</Button>
                                    </div>
                                    <h3 style={{ display: this.state.show ? "block" : "none" }}>Zmiana hasła</h3>
                                    <Form style={{ display: this.state.show ? "block" : "none" }}>

                                        <Form.Field >
                                            <label>Stare hasło</label>
                                            <input placeholder='' />
                                        </Form.Field>
                                        <Form.Field >
                                            <label>Nowe hasło</label>
                                            <input placeholder='' />
                                        </Form.Field>
                                        <Form.Field >
                                            <label>Potwierdź nowe hasło</label>
                                            <input placeholder='' />
                                        </Form.Field>
                                    </Form>

                                    <div style={{ display: this.state.show ? "none" : "block" }}>
                                        <h3><label> Damian Wnukowski</label></h3>
                                        <h4><label>Email: damian.wnukowski@email.com</label></h4>
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
