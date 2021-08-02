import React from 'react';
import {Icon, Grid, Segment} from 'semantic-ui-react'

export default function ProfileBio(){
    return(
        <>
            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="user circle" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                        <Segment vertical>
                            <h3>First Name Last Name</h3>
                        </Segment>
                        <Segment>
                        <span> Bio: blah blah blah</span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}