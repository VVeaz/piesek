import React from 'react'
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Form, Grid } from "semantic-ui-react";

function RegistrationUser() {
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
                            Dokończ proces rejestracji podają swoje hasło.
                        </p>

                        <Grid columns={3}>
                            <Grid.Column>
                                <Form>

                                    <Form.Field type="password">
                                        <label>Hasło:</label>
                                        <input type="password" />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Powtórz hasło:</label>
                                        <input type="password" />
                                    </Form.Field>

                                    <Button style={{ backgroundColor: "#CAE2FF" }} type='submit'>Zatwierdź hasło</Button>
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
