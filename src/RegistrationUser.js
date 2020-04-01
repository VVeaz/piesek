import React from 'react'
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenuUnlogged";
import { Button, Form, Grid } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import axios from 'axios'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function RegistrationUser() {
    const [password, setPassword] = React.useState("");
    const [confirmedPassword, setConfirmedPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [formVisible, setFormVisible] = React.useState("");
    let token = useQuery().get("token");

    function validateForm() {
        return password.length > 7 && confirmedPassword.length > 7;
    }

    function handleSubmit(event) {
        if (password !== confirmedPassword) {
            setErrorMessage("Hasła muszą być jednakowe")
            return;
        }

        setErrorMessage("")
        axios.post('http://localhost:8080/api/user-account/finalize-user-account-create', {
            "token": token,
            "password": password,
            "passwordConfirm": confirmedPassword
        }).then(function (response) {
            setFormVisible("none");
            setSuccessMessage("Rejestracja zakończona sukcesem!!")
            console.log(response);
        }).catch(function (error) {
            setErrorMessage("Nie udało się zakończyć rejestracji...");
            console.log(error);
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
                        <p>
                            Administrator dodał twoje nowe konto do systemu. <br />
                            Dokończ proces rejestracji podają swoje hasło. <br />
                            Hasło musi mieć co najmniej 8 liter.
                        </p>
                        <div style={{ color: "red", padding: "1% 1% 1% 1%" }}>
                            {errorMessage}
                        </div>
                        <div style={{ color: "green", padding: "1% 1% 1% 1%" }}>
                            {successMessage}
                        </div>
                        <Grid columns={3} style={{ display: formVisible }}>
                            <Grid.Column>
                                <Form onSubmit={handleSubmit}>
                                    <label>Hasło: </label>
                                    <Form.Input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <label>Powtórz hasło: </label>
                                    <Form.Input
                                        type="password"
                                        value={confirmedPassword}
                                        onChange={e => setConfirmedPassword(e.target.value)}
                                    />

                                    <Button style={{ backgroundColor: "#CAE2FF" }} disabled={!validateForm()} type='submit'>Zatwierdź hasło</Button>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default RegistrationUser;
