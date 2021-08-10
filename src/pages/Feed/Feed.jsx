import React, {useEffect, useState} from 'react';
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import HeaderComp from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import * as jumpApi from '../../utils/jumpApi';
import * as jumperApi from '../../utils/jumperApi'
import "./Feed.css"
import {Icon} from 'semantic-ui-react'


export default function Feed({user, handleLogout}){
    
    const [jumps, setJumps] = useState([])
    const [loading, setLoading] = useState(true);
    const [jumpsExist, setJumpsExist] = useState(true);

    async function getJumps(){
        try {
            const data = await jumpApi.getAll();
            setJumps([...data.jumps])
            if (!data.jumps.length){
                setJumpsExist(false)
            }
            setLoading(false)
        } catch (err){
            console.log(err)
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

    async function deleteJump(jumpId){
        try {
            const data = await jumpApi.deleteJump(jumpId);
            getJumps()
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getJumps()
    }, [])

    return(
        <>
            <HeaderComp user={user} handleLogout={handleLogout}/>
            <div className="feed">
                <br />
                <Icon name="users" size="huge"></Icon>
                <br />
                <h3 className="page-message">Here's the scoop at the DZ!</h3>
                <br />
                <JumpFeed jumpsExist={jumpsExist} isFeed={true} user={user} feedUser={user} jumps={jumps} loading={loading} addJumper={addJumper} removeJumper={removeJumper} deleteJump={deleteJump}/>
            </div>
            <Footer user={user}/>
        </>
    )
}