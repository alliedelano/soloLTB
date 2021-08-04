import React, { useState, useEffect } from 'react'
import userService from '../../utils/userService'
import { useParams } from 'react-router-dom'
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import * as jumpApi from '../../utils/jumpApi'
import { Grid, Loader } from 'semantic-ui-react'

export default function MyJumpsPage({user, handleLogout}){
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

    useEffect(() => {
        getJumps();
    }, [])

    
    return(
        <>
            <h1>This is the my jumps page</h1>
            <MenuBar />
            <Header user={user}/>
            <JumpFeed user={user} jumps={jumps} loading={loading}/>
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}