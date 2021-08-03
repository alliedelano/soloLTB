import React, { useState, useEffect } from 'react'
import userService from '../../utils/userService'
import { useParams } from 'react-router-dom'
import MenuBar from '../../components/MenuBar/MenuBar'
import Footer from '../../components/Footer/Footer'
import ProfileBio from '../../components/ProfileBio/ProfileBio'
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import { Grid, Loader } from 'semantic-ui-react'


export default function ProfilePage({user, handleLogout}){
    
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    const { username } = useParams();

    async function getProfile() {
        try {
            const data = await userService.getProfile(username);
            setLoading(() => false);
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError("Profile does not exist")
        }
    }
    
    useEffect(() => {
        getProfile();
    }, [])

    if (error) {
        return(
            <>
                <MenuBar user={user} />
                <h1>{error}</h1>
            </>
        )
    }

    if (loading) {
        return (
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Loader size="large" active>
                Loading
              </Loader>
            </Grid.Column>
          </Grid>
        );
    }

    return(
        <>
            <MenuBar user={user}/>
            <ProfileBio user={profileUser}/>
            <JumpFeed user={profileUser}/>
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}