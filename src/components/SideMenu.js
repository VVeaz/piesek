import React, { Component } from "react";
import { Menu, Container, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import icon from "../logo.png";

export default class SideMenu extends Component {
  state = {};
  menuStyle = {
    border: 0,
    boxShadow: "none",
    fontSize: 20,
    backgroundColor: "#CAE2FF",
    height: "100vh",
    width: "100%"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical style={this.menuStyle} height={window.innerHeight}>
        <Container>
          <Menu.Item>
            <Link to="/"> <Image src={icon}></Image></Link>
            <Menu.Header>Zalogowany jako:</Menu.Header>
            <Menu.Header>Damian Wnukowski</Menu.Header>
            <Menu.Menu>
              <Link to="/account-settings">
                <Menu.Item
                  name="Ustawienia konta"
                  active={activeItem === "Ustawienia konta"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Menu.Item
                name="Powiadomienia"
                active={activeItem === "Powiadomienia"}
                onClick={this.handleItemClick}
              />
              <Menu.Item name="Wyloguj się" onClick={e => { localStorage.setItem('Authorization', ""); window.location.reload(); }} />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Dla pracowników</Menu.Header>
            <Menu.Menu>
              <Link to="/animals-folder">
                <Menu.Item
                  name="Katalog ze zwierzętami"
                  active={activeItem === "Katalog ze zwierzętami"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Menu.Item
                name="Harmonogram zdarzeń"
                active={activeItem === "Harmonogram zdarzeń"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Dla administratora</Menu.Header>
            <Menu.Menu>
              <Link to="/register">
                <Menu.Item
                  name="Zarejestruj nowego pracownika"
                  active={activeItem === "Zarejestruj nowego pracownika"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Menu.Item
                name="Zarządzaj kontami"
                active={activeItem === "Zarządzaj kontami"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
