import React, { useState, useEffect } from 'react'
import userService from '../../utils/userService'
import { useParams } from 'react-router-dom'
import MenuBar from '../../components/MenuBar/MenuBar'
import Footer from '../../components/Footer/Footer'
import ProfileBio from '../../components/ProfileBio/ProfileBio'
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import { Grid, Loader, Divider } from 'semantic-ui-react'
import * as jumpApi from '../../utils/jumpApi'
import * as jumperApi from '../../utils/jumperApi'
import HeaderComp from '../../components/Header/Header'
import './ProfilePage.css'
import * as permissionApi from '../../utils/permissionApi'
import { findAllByDisplayValue } from '@testing-library/react'


export default function ProfilePage({user, handleLogout}){
    
    const [profileUser, setProfileUser] = useState({});
    const [profileDz, setProfileDz] = useState({})
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [allJumps, setAllJumps] = useState([])
    const [orgJumps, setOrgJumps] = useState([]);
    const [joinedJumps, setJoinedJumps] = useState([]);
    const [myProfile, setMyProfile] = useState(false)
    const [jumpsExist, setJumpsExist] = useState(true);

    
    async function getJumps(){
        try {
            const data = await jumpApi.getAll();
            setAllJumps([...data.jumps])
            setLoading(false)
        } catch (err){
            console.log(err, " this is the error")
        }
    }
    async function addJumper(jumpId){
        try {
            const data = await jumperApi.addJumper(jumpId);
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }

    async function removeJumper(jumperId){
        try {
            const data = await jumperApi.removeJumper(jumperId);
            getProfile()
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteJump(jumpId){
        try {
            const data = await jumpApi.deleteJump(jumpId);
            getProfile()
        } catch (err){
            console.log(err)
        }
    }

    

    const { username } = useParams();

    async function getProfile() {
        try {
            setMyProfile(false)
            const data = await userService.getProfile(username);
            setLoading(() => false);
            setProfileUser(() => data.user);
            setProfileDz(() => data.dropzone)
            setOrgJumps(() => data.orgJumps)
            setJoinedJumps(() => data.joinedJumps)
            await getPermissions()
            if (data.user.username === user.username){
                setMyProfile(true)
            }
            if (!data.joinedJumps.length){
                setJumpsExist(false)
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError("Profile does not exist")
        }
    }

    async function getPermissions(){
        try {
          const data = await permissionApi.getPermissions(user._id)
          if (data.permissions.length) {
              setAdmin(true)
          } else {
              console.log('no permissions')
          }
        } catch (err){
          console.log("error getting permissions")
        }
      }

    
    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        getProfile();
    }, [username])

    useEffect(() => {
    }, [joinedJumps])

    


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
            <HeaderComp user={user} handleLogout={handleLogout}/>
            
            <div className="profile-page">
            <br />
            <br />
            <ProfileBio feedUser={profileUser} dropzone={profileDz} admin={admin} myProfile={myProfile}/>
            <br />
            <Divider />
            <h3 className="page-message">{profileUser.firstName}'s Jumps</h3>
            <br />
            <JumpFeed 
                user={user}
                feedUser={profileUser}  
                jumps={joinedJumps}
                isProfile={true} 
                loading={loading} 
                addJumper={addJumper} 
                removeJumper={removeJumper}
                deleteJump={deleteJump}
                jumpsExist={jumpsExist}
                />
            </div>
            <Footer user={user} />
            
        </>
    )
}