import React from 'react';
import { Card, Icon, Image, Segment, Dimmer, Loader, Button, Grid} from "semantic-ui-react";
import {Link} from 'react-router-dom'
import './JumpDetails.css'

export default function JumpDetails({jump, addJumper, removeJumper, user, deleteJump, loading, full, users}){
    
    const onJump = jump.jumpers.findIndex(jumper => jumper.username === user.username)

    const clickHandler = onJump > -1 ? () => removeJumper(jump.jumpers[onJump]._id): () => addJumper(jump._id)
    const text = onJump > -1 ? 'Remove Me' : 'Add Me'
    const buttonColor = onJump > -1 ? 'red' : 'green'
    

    function handleSubmit(e){
        e.preventDefault()
        deleteJump(jump._id)
    }
    
    
    return(
        <>
            <br />
            <h2>Jump Details</h2>
            <div className="detail-container">
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
                        <table>
                            
                            
                        
                        {jump.jumpers.map((jumper) => {
                        return(
                            <tbody>
                            <tr key={jumper._id}>
                                <Link to={`/${jumper.username}`}><td><Image src={`${jumper.userAvatar}`} avatar size="big" /></td>
                                <td>{jumper.username}</td></Link>
                                <td>{(user.username === jump.username) ? <><Icon name="cancel" size="large" onClick={() => removeJumper(jumper._id)} /> <p>Remove</p> </>: ""}</td>
                            </tr>
                            </tbody>
                        )
                    })}
                        </table>
                        
                        </Grid.Row>
                        <Grid.Row>
                        { (jump.jumpers.length === parseInt(jump.slots) ? <h5>Jump Full!</h5>:<h5>Looking for more jumpers! ({jump.jumpers.length} / {parseInt(jump.slots)} slots)</h5>)}                        
                        </Grid.Row>
                        <Card.Description>{jump.description}</Card.Description>
                        <Grid.Row>
                            <Card.Description>Organized by: {jump.username}</Card.Description> 
                        </Grid.Row>  
                    </Grid>
                </Card.Content>
                 
                <Card.Content extra>
                    {full && onJump > -1 ? <><Button color="red" onClick={() => removeJumper(jump.jumpers[onJump]._id)}>Remove Me</Button><br /></> : ''}
                    
                    {!full ?  
                    <><Button color={buttonColor} onClick={clickHandler}>{text}</Button>
                    <br /></> : ''
                }
                    {(jump.organizer === user._id) ? <> <br /><Button color="blue" className="delete-jump-btn" onClick={handleSubmit}>Delete My Jump</Button> <br />Warning: Cannot be undone! </>: null }
                </Card.Content> 
            </Card>
            </div>
        </>
    )
}