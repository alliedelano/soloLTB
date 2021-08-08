import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Segment, Dimmer, Loader, Button, Grid} from "semantic-ui-react";
import {Link} from 'react-router-dom'
import * as jumpApi from '../../utils/jumpApi'
import './JumpCard.css'

export default function JumpCard({jump, addJumper, removeJumper, user, deleteJump, today, feedUser}){

    //const [jumpers, setJumpers] = useState(jump.jumpers)
    const [loading, setLoading] = useState(false)

    const onJump = jump.jumpers.findIndex(jumper => jumper.username === user.username)

    const clickHandler = onJump > -1 ? () => removeJumper(jump.jumpers[onJump]._id): () => addJumper(jump._id)
    const text = onJump > -1 ? 'Remove Me' : 'Add Me'
    const color = onJump > -1 ? 'red' : 'green'
   

    function handleSubmit(e){
        e.preventDefault()
        deleteJump(jump._id)
    }



    return(
        <>

            <Card key={jump._id} color='blue'>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="small">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : null}
            
                <Card.Content>
                    <Card.Header>{jump.name}</Card.Header>
                    <Card.Description>
                        <h5>{new Date((jump.date).replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}</h5>
                    </Card.Description>

                    <Grid textAlign='center' columns={3}>
                        <Grid.Row>
                            
                        </Grid.Row>
                        <Grid.Row>
                        {jump.jumpers.map((jumper) => {
                        return(
                            <Link to={`/${jumper.username}`}><Image src={`${jumper.userAvatar}`} avatar size="big" /></Link>
                        )
                    })}
                    
                        </Grid.Row>
                        <Grid.Row>
                        { (jump.jumpers.length === parseInt(jump.slots) ? <h5>Jump Full!</h5>:<h5>Looking for more jumpers! ({jump.jumpers.length} / {parseInt(jump.slots)} slots)</h5>)}
                        </Grid.Row>  
                        <Grid.Row>
                            <Link to={`/jumps/${jump._id}`}><Card.Description>See more details</Card.Description></Link>
                        </Grid.Row>  
                    
                    </Grid>
                </Card.Content>
                
                <Card.Content extra>
                    <Button color={color} onClick={clickHandler}>{text}</Button>
                    <br />
                </Card.Content> 
            </Card>
           
        </>
    )
}