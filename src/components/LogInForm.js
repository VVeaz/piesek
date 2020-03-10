import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';

export default () => (
    <Grid centered columns={3}>
        <Grid.Column>
            <Segment>
                <Form size="large">
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Email"
                    />
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Hasło"
                        type="password"
                    />
                    <Button style={{ backgroundColor: "#CAE2FF" }} fluid size="large">
                        Zaloguj sie
                    </Button>
                </Form>
            </Segment>
        </Grid.Column>
    </Grid>
);