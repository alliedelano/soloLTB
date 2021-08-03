import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";

export default function JumpCard({jump}){
    return(
        <>
            <Card key={jump._id}>
                <Card.Content>
                    <Card.Description>{jump.name}</Card.Description>
                    <Card.Description>{jump.date}</Card.Description>
                    <Card.Description>{jump.slots}-way</Card.Description>
                    <Card.Description>{jump.description}</Card.Description>
                    <Card.Description>Organized by: {jump.username}</Card.Description>
                    
                </Card.Content>
            </Card>
        </>
    )
}