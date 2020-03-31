import React from 'react'
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Select, Form, Grid } from "semantic-ui-react";
import AppUnlogged from "./AppUnlogged";
import App from "./App";
import axios from 'axios'
const roleOptions = [
    { key: 'u', text: 'Pracownik', value: 'USER' },
    { key: 'a', text: 'Admin', value: 'ADMINISTRATOR' }
]
const formFields = { email: '', name: '', lastName: '', role: '' }
function RegistrationAdmin() {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [succesMessage, setSuccesMessage] = React.useState("");
    async function hasPermission(permission) {

        let res = await axios.get('http://localhost:8080/api/role/my-permissions')
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
                return []
            })
        return await res.indexOf(permission) != -1;
    }
    function inputChangeHandler(e, name, value) {
        if (name == 'role') {
            formFields[name] = value;
        } else {
            formFields[name] = e.target.value;
        }
    }
    function resetHandler(event) {
        for (var k in formFields) {
            formFields[k] = '';
        }
    }

    function formHandler(event) {
        setErrorMessage("");
        setSuccesMessage("Proszę czekać")
        axios.post('http://localhost:8080/api/user-account/init-user-account-create', formFields)
            .then(function (response) {
                setErrorMessage("");
                setSuccesMessage("Wysłano link aktywacyjny na " + formFields['email']);

            })
            .catch(function (error) {
                setSuccesMessage("")
                setErrorMessage("Błędne dane");
                console.log(error);
                console.log(formFields)
            });

    }
    if (!axios.defaults.headers.common["Authorization"]) {
        return (<AppUnlogged />);
    }
    if (!hasPermission("MANAGE_USER_ACCOUNTS")) {
        return (<App />);
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
                                <Form onSubmit={formHandler} onReset={resetHandler}>
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
                                    <div>
                                        <Button style={{ backgroundColor: "#CAE2FF" }} type='submit'>Dodaj pracownika</Button>
                                        <Button style={{ backgroundColor: "#CAE2FF" }} type='reset'> Czyść</Button>
                                    </div>
                                    <Form.Field style={{ color: "red", padding: "1% 1% 1% 1%" }}>
                                        {errorMessage}
                                    </Form.Field>
                                    <Form.Field style={{ color: "green", padding: "1% 1% 1% 1%" }}>
                                        {succesMessage}
                                    </Form.Field>
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
