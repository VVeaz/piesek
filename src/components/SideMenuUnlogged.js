import React, { Component } from "react";
import { Menu, Container, Image, Button } from "semantic-ui-react";
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
        width: "100%",
        "text-align": "center"
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu vertical style={this.menuStyle} height={window.innerHeight}>
                <Container>
                    <Menu.Item>
                        <Image src={icon}></Image>
                        <Menu.Menu>
                            <Menu.Item>
                                <Link to="/login"><Button style={{ backgroundColor: "#FFFFFF", width: "100%" }}>Zaloguj się</Button></Link>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu.Item>

                </Container>
            </Menu >
        );
    }
}
