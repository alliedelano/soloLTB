import React, {useEffect, useState} from 'react';
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import * as jumpApi from '../../utils/jumpApi';


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

    useEffect(() => {
        getJumps();
    }, [])


    return(
        <>
            <MenuBar />
            <Header user={user}/>
            <h3>Here's what's happening at your DZ!</h3>
            <JumpFeed user={user} jumps={jumps} loading={loading}/>
            <Footer user={user} handleLogout={handleLogout}/>
        </>

    )
}