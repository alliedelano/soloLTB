import React, { useEffect } from 'react';
import {Icon, Grid, Segment, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function ProfileBio({user, dropzone, admin}){

    return(
        <>
        <div className="profile-bio">
            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Image className="profile-pic" src={user.photoUrl} avatar size="medium" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                        <Segment vertical>
                            <h3 className="profile-text">{user.firstName} {user.lastName} (@{user.username})</h3> 
                            <h4 className="profile-text">{dropzone.name}</h4>
                            <h4 className="profile-text">Experience Level: {user.experience}</h4>
                        </Segment>
                        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Segment>
                        <span> {user.bio}</span>
                    </Segment>
                </Grid.Row>
                <div className="admin-link">
                    {admin ? 
                    <Link to="/admin"><Icon name="cog" size="large"/>Admin Portal</Link> 
                    : ''}
                </div>
            </Grid>
            </div>
        </>
    )
}