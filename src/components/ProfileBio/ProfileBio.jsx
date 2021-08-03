import React from 'react';
import {Icon, Grid, Segment} from 'semantic-ui-react'

export default function ProfileBio({user}){
    return(
        <>
            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="user circle" size="massive" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                        <Segment vertical>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <h3>{user.homeDz}</h3>
                            <h3>Experience Level: {user.experience}</h3>
                        </Segment>
                        <Segment>
                        <span> {user.bio}</span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}