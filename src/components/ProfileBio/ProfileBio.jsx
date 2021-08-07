import React, { useEffect } from 'react';
import {Icon, Grid, Segment, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function ProfileBio({user, dropzone, admin, feedUser, myProfile}){

    return(
        <>
        <div className="profile-bio">
            <Grid textAlign='center' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Image className="profile-pic" src={feedUser.photoUrl} avatar size="medium" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                        <Segment vertical>
                            <h3 className="profile-text">{feedUser.firstName} {feedUser.lastName} (@{feedUser.username})</h3> 
                            <h4 className="profile-text">{dropzone.name}</h4>
                            <h4 className="profile-text">Experience Level: Over {feedUser.experience} jumps</h4>
                        </Segment>
                        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Segment>
                        <span> {feedUser.bio}</span>
                    </Segment>
                </Grid.Row>
                <div className="admin-link">
                    {admin && myProfile ? 
                    <Link to="/admin"><Icon name="cog" size="large"/>Admin Portal</Link> 
                    : ''}
                </div>
            </Grid>
            </div>
        </>
    )
}