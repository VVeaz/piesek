import React from 'react'
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Select, Form, Grid } from "semantic-ui-react";
import axios from 'axios'
const roleOptions = [
    { key: 'e', text: 'Pracownik', value: 'employee' },
]
const formFields = { email: '', name: '', lastName: '', role: '' }
function RegistrationAdmin() {

    function inputChangeHandler(e) {
        formFields[e.target.name] = e.target.value;

    }
    function formHandler(formFields) {
        axios.post('user-account/init-user-account-create', formFields)
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    return (
        <div style={{ height: "100%" }}>
            <Grid style={{ height: "100%", padding: 0, margin: 0 }}>
                <Grid.Column stretched width={2} style={{ padding: 0, margin: 0 }}>
                    <SideMenu />
                </Grid.Column>
                <Grid.Column stretched width={14}>
                    <div>
                        <h1>Rejestracja nowego pracownika</h1>


                        <hr />


                        <Grid columns={3}>
                            <Grid.Column>
                                <Form onsubmit={formHandler(formFields)}>

                                    <Form.Field onChange={(e) => inputChangeHandler(e)}>
                                        <label>Imię</label>
                                        <input placeholder='Imię' />
                                    </Form.Field>
                                    <Form.Field onChange={(e) => inputChangeHandler(e)}>
                                        <label>Nazwisko</label>
                                        <input placeholder='Nazwisko' />
                                    </Form.Field>
                                    <Form.Field onChange={(e) => inputChangeHandler(e)}>
                                        <label>E-mail</label>
                                        <input placeholder='E-mail' />
                                    </Form.Field>
                                    <Form.Field onChange={(e) => inputChangeHandler(e)}
                                        control={Select}
                                        options={roleOptions}
                                        placeholder='Rola'
                                    />


                                    <Button style={{ backgroundColor: "#CAE2FF" }} type='submit'>Dodaj pracownika</Button>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default RegistrationAdmin;
