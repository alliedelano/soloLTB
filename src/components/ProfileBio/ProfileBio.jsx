import React, { useEffect } from 'react';
import {Icon, Grid, Segment} from 'semantic-ui-react'

export default function ProfileBio({user, dropzone}){

    return(
        <>
            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="user circle" size="massive" color="red" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                        <Segment vertical>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <h5>@{user.username}</h5>
                            <h3>{dropzone.name}</h3>
                            <h4>Experience Level: {user.experience}</h4>
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