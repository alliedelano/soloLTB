import React, { useState, useEffect } from 'react'
import userService from '../../utils/userService'
import { useParams } from 'react-router-dom'
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import * as jumpApi from '../../utils/jumpApi'
import * as jumperApi from '../../utils/jumperApi'
import { Grid, Loader } from 'semantic-ui-react'

export default function MyJumpsPage({user, handleLogout}){
    const [jumps, setJumps] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [profileUser, setProfileUser] = useState({});
    const [profileDz, setProfileDz] = useState({})
    const [allJumps, setAllJumps] = useState([])
    const [orgJumps, setOrgJumps] = useState([]);
    const [joinedJumps, setJoinedJumps] = useState([]);

    
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
            getJumps();
        } catch (err) {
            console.log(err);
        }
    }

    async function removeJumper(jumperId){
        try {
            const data = await jumperApi.removeJumper(jumperId);
            getJumps()
        } catch (err) {
            console.log(err);
        }
    }


    async function getProfile() {
        try {
            const data = await userService.getProfile(user.username);
            setLoading(() => false);
            setProfileUser(() => data.user);
            setProfileDz(() => data.dropzone)
            setOrgJumps(() => data.orgJumps)
            setJoinedJumps(() => data.joinedJumps)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError("Profile does not exist")
        }
    }
    
    useEffect(() => {
        getProfile();
    }, [])
    

    async function getJumps(){
        try {
            const data = await jumpApi.getAll();
            setJumps([...data.jumps])
            setLoading(false)
        } catch (err){
            console.log(err, " this is the error")
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    
    return(
        <>
            <MenuBar />
            <Header user={user}/>
            <h5>Here are your jumps:</h5>
            <br />
            <JumpFeed user={profileUser} jumps={joinedJumps} loading={loading} addJumper={addJumper} removeJumper={removeJumper}/>
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}