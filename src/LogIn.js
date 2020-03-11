import React from "react";
import "semantic-ui-css/semantic.min.css";
import SideMenuUnlogged from "./components/SideMenuUnlogged";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';
import './css/LogIn.css'

export default function LogIn() {
    const [token, setToken] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)

        const param = {
            method: 'POST',
            body: formData,
        }

        try {
            fetch("http://localhost:8080/login", param)
                .then(response => setToken(response))
            // .then(data => this.setState({ token: data.token })))

        } catch{
            setErrorMessage("PROBLEM Z SERWEREM...")
        }

        if (this.token == null) {
            setErrorMessage("NIEPRAWIDŁOWE DANE LOGOWANIA")
        }
        else {
            setErrorMessage("UDANE")
        }
    }

    return (
        <div style={{ height: "100%" }}>
            <Grid style={{ height: "100%", padding: 0, margin: 0 }}>
                <Grid.Column stretched width={2} style={{ padding: 0, margin: 0 }}>
                    <SideMenuUnlogged />
                </Grid.Column>
                <Grid.Column stretched width={14}>
                    <div>
                        <h1>Strona logowania</h1>
                        <hr />
                        <div className="mainContent">
                            <div style={{ color: "red", textAlign: "center", padding: "1% 1% 1% 1%" }}>
                                {errorMessage}
                            </div>
                            <Grid centered columns={3}>
                                <Grid.Column>
                                    <Segment>
                                        <Form size="large" onSubmit={handleSubmit}>
                                            <Form.Input
                                                fluid
                                                icon="user"
                                                iconPosition="left"
                                                placeholder="Email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                            <Form.Input
                                                fluid
                                                icon="lock"
                                                iconPosition="left"
                                                placeholder="Hasło"
                                                type="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <Button style={{ backgroundColor: "#CAE2FF" }} disabled={!validateForm()} fluid size="large">
                                                Zaloguj sie
                                            </Button>
                                        </Form>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}
