import React from 'react'
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Button, Select, Form, Grid } from "semantic-ui-react";
const roleOptions = [
    { key: 'e', text: 'Pracownik', value: 'employee' },
]
function RegistrationAdmin() {
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
                                <Form>

                                    <Form.Field>
                                        <label>Imię</label>
                                        <input placeholder='Imię' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nazwisko</label>
                                        <input placeholder='Nazwisko' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>E-mail</label>
                                        <input placeholder='E-mail' />
                                    </Form.Field>
                                    <Form.Field
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
