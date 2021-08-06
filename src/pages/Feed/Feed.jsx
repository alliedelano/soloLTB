import React, {useEffect, useState} from 'react';
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import MenuBar from '../../components/MenuBar/MenuBar'
import HeaderComp from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import * as jumpApi from '../../utils/jumpApi';
import * as jumperApi from '../../utils/jumperApi'
import * as permissionApi from '../../utils/permissionApi'
import "./Feed.css"


export default function Feed({user, handleLogout}){
    
    const [jumps, setJumps] = useState([])
    const [loading, setLoading] = useState(true);

    async function getJumps(){
        try {
            const data = await jumpApi.getAll();
            setJumps([...data.jumps])
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
            <br />
            <div className="feed">
                <br />
            <h3 className="page-message">Here's the scoop at your DZ!</h3>
            <br />
            <JumpFeed user={user} feedUser={user} jumps={jumps} loading={loading} addJumper={addJumper} removeJumper={removeJumper} deleteJump={deleteJump}/>
            </div>
            <Footer user={user}/>
        </>

    )
}