import React from "react";
import "semantic-ui-css/semantic.min.css";
import SideMenuUnlogged from "./components/SideMenuUnlogged";
import { Grid } from "semantic-ui-react";
import LogInForm from "./components/LogInForm";
import './css/LogIn.css'

function LogIn() {
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
                            <LogInForm />
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default LogIn;