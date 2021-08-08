import React, { useState, useEffect } from 'react';
import JumpDetails from '../../components/JumpDetails/JumpDetails'
import * as jumpApi from '../../utils/jumpApi'
import * as jumperApi from '../../utils/jumperApi'
import HeaderComp from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useParams, useHistory } from 'react-router-dom'
import './SingleJumpPage.css'
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import AddFriendForm from '../../components/AddFriendForm/AddFriendForm'

export default function SingleJumpPage({user, handleLogout}){
    
    const [jump, setJump] = useState({})
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    const { jumpId } = useParams();
    const history = useHistory()
    
    async function getJump(){
        try {
            console.log(jumpId)
            const data = await jumpApi.getJump(jumpId);
            console.log(data.jump)
            await setJump(data.jump)
            setLoading(false)
        } catch (err) {
            console.log(err, ' error from getting jump - jump page')
        }
    }

    async function addJumper(jumpId){
        try {
            const data = await jumperApi.addJumper(jumpId);
            getJump();
        } catch (err) {
            console.log(err);
        }
    }

    async function removeJumper(jumperId){
        try {
            const data = await jumperApi.removeJumper(jumperId);
            getJump()
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteJump(jumpId){
        try {
            const data = await jumpApi.deleteJump(jumpId);
            history.push("/myjumps")
        } catch (err){
            console.log(err)
        }
    }

    async function findFriends(){
        console.log('no friends yet')
        // find all the users
        // for each, define const of onThisJump 
        // if onThisJump > -1 => they're on the jump already : push them to non-jumpers collection 
        // set nonJumpers to non-jumpers array
        // 
    }





    useEffect(() => {
        getJump()
    }, [])

    useEffect(() => {
    }, [jump])
    
    
    return(
        <>
            <HeaderComp user={user} handleLogout={handleLogout}/>
            <div className="single-jump">
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="small">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : 
            <><JumpDetails jump={jump} user={user} loading={loading} addJumper={addJumper} removeJumper={removeJumper} deleteJump={deleteJump}/>
            <br />
            <AddFriendForm user={user} loading={loading}/></>
        }
            </div>
            <Footer user={user}/>
        
        </>
    )
}