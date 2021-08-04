import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";
import JumpersDisplay from '../../components/JumpersDisplay/JumpersDisplay'

export default function JumpCard({jump, addJumper, removeJumper, user}){

    const onJump = jump.jumpers.findIndex(jumper => jumper.username === user.username)

    const clickHandler = onJump > -1 ? () => removeJumper(jump.jumpers[onJump]._id) : () => addJumper(jump._id)
    const icon = onJump > -1 ? 'minus' : 'plus'
    


    return(
        <>
            <Card key={jump._id}>
                <Card.Content>
                    <Card.Header>{jump.name}</Card.Header>
                    <Card.Description>{jump.date}</Card.Description>
                    <Card.Description>{jump.slots}-way</Card.Description>
                    <Card.Description>{jump.description}</Card.Description>
                    <Card.Description>Organized by: {jump.username}</Card.Description>
                    <Card.Description>{jump.dzName}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <h5>Jumpers:</h5><JumpersDisplay jump={jump} addJumper={addJumper} />
                    <Icon name={icon} size="large" onClick={clickHandler} />
                    {jump.jumpers.length} Jumpers
                </Card.Content>
            </Card>
        </>
    )
}