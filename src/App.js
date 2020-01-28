import React from "react";
import "semantic-ui-css/semantic.min.css";
import SideMenu from "./components/SideMenu";
import { Grid } from "semantic-ui-react";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Grid style={{ height: "100%", padding: 0, margin: 0 }}>
        <Grid.Column stretched width={2} style={{ padding: 0, margin: 0 }}>
          <SideMenu />
        </Grid.Column>
        <Grid.Column stretched width={14}>
          <div>
            <h1>Strona główna</h1>
            <hr />
            <p>
              <h4>Witaj w aplikacji PIESEK.</h4>
            </p>
            <hr />
            <h2>Aktualności</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
