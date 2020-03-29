import React from 'react'
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Select, Form, Grid } from "semantic-ui-react";
import axios from 'axios'
const roleOptions = [
    { key: 'u', text: 'Pracownik', value: 'USER' },
]
const formFields = { email: '', name: '', lastName: '', role: '' }
function RegistrationAdmin() {

    function inputChangeHandler(e, name, value) {
        if (name == 'role') {
            formFields[name] = value;
        } else {
            formFields[name] = e.target.value;
        }


    }
    function formHandler(event) {
        console.log(formFields)
        axios.post('http://localhost:8080/api/user-account/init-user-account-create', formFields)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                console.log(formFields)
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
                                <Form onSubmit={formHandler}>

                                    <Form.Field onChange={(e) => inputChangeHandler(e, 'name')}>
                                        <label>Imię</label>
                                        <input placeholder='Imię' />
                                    </Form.Field>
                                    <Form.Field onChange={(e) => inputChangeHandler(e, 'lastName')}>
                                        <label>Nazwisko</label>
                                        <input placeholder='Nazwisko' />
                                    </Form.Field>
                                    <Form.Field onChange={(e) => inputChangeHandler(e, 'email')}>
                                        <label>E-mail</label>
                                        <input placeholder='E-mail' />
                                    </Form.Field>
                                    <Form.Field onChange={(e, { value }) => inputChangeHandler(e, 'role', value)}
                                        control={Select}
                                        options={roleOptions}
                                        placeholder='Rola'
                                        label={{ children: 'Rola', htmlFor: 'form-select-control-gender' }}
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
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
