import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Segment, Dimmer, Loader } from "semantic-ui-react";
import {Link} from 'react-router-dom'
import * as jumpApi from '../../utils/jumpApi'

export default function JumpCard({jump, addJumper, removeJumper, user}){

    //const [jumpers, setJumpers] = useState(jump.jumpers)
    const [loading, setLoading] = useState(false)

    const onJump = jump.jumpers.findIndex(jumper => jumper.username === user.username)

    const clickHandler = onJump > -1 ? () => removeJumper(jump.jumpers[onJump]._id): () => addJumper(jump._id)
    const icon = onJump > -1 ? 'minus' : 'plus'

    // async function getJumpers(){
    //     try{
    //         const data = await jumpApi.findJumpers(jump._id);
    //         setJumpers([...data.jumpers])
    //         //setLoading(false)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     getJumpers()
    // }, [])

    return(
        <>
            <Card key={jump._id}>
            {/* {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="small">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : null} */}
                <Card.Content>
                    <Card.Header>{jump.name}</Card.Header>
                    <Card.Description>{jump.date}</Card.Description>
                    <Card.Description>{jump.slots}-way</Card.Description>
                    <Card.Description>{jump.description}</Card.Description>
                    <Card.Description>Organized by: {jump.username}</Card.Description>
                    <Card.Description>{jump.dzName}</Card.Description>
                </Card.Content>
                <Card.Content>
                    {jump.jumpers.map((jumper) => {
                        return(
                            <Link to={`/${jumper.username}`}><Image src={`${jumper.userAvatar}`} avatar size="small" /></Link>
                        )
                    })}
                    Jumpers: {jump.jumpers.length} / {parseInt(jump.slots)}
                    { (jump.jumpers.length === parseInt(jump.slots) ? <h5>Jump Full!</h5>:<h5>More spots available!</h5>)}
                    <Icon name={icon} size="large" onClick={clickHandler} />
                </Card.Content>
            </Card>
        </>
    )
}