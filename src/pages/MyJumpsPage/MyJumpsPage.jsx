import React, { useState, useEffect } from 'react'
import userService from '../../utils/userService'
import HeaderComp from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import * as jumpApi from '../../utils/jumpApi'
import * as jumperApi from '../../utils/jumperApi'
import './MyJumpsPage.css'
import {Icon} from 'semantic-ui-react'

export default function MyJumpsPage({user, handleLogout}){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [profileUser, setProfileUser] = useState({});
    const [profileDz, setProfileDz] = useState({})
    const [allJumps, setAllJumps] = useState([])
    const [orgJumps, setOrgJumps] = useState([]);
    const [joinedJumps, setJoinedJumps] = useState([]);
    const [jumpsExist, setJumpsExist] = useState(true);


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


    async function getProfile() {
        try {
            const data = await userService.getProfile(user.username);
            setProfileUser(() => data.user);
            setProfileDz(() => data.dropzone)
            setOrgJumps(() => data.orgJumps)
            setJoinedJumps(() => data.joinedJumps)
            if (!data.joinedJumps.length){
                setJumpsExist(false)
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError("Profile does not exist")
        }
    }
    
    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
    }, [joinedJumps])
 
    return(
        <>
            <HeaderComp user={user} handleLogout={handleLogout}/>
            <div className="my-jumps">
                <br />
                <Icon name="calendar alternate" size="huge"></Icon> 
                <br />
                <h3 className="page-message">My Jumps</h3>
                <br />
                <JumpFeed 
                    user={user}
                    feedUser={profileUser} 
                    jumps={joinedJumps} 
                    loading={loading} 
                    addJumper={addJumper} 
                    removeJumper={removeJumper}
                    deleteJump={deleteJump}
                    isMyJumps={true}
                    jumpsExist={jumpsExist}
                    />
            </div>
            <Footer user={user}/>
        </>
    )
}