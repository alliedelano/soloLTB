import React from 'react';
import JumpCard from '../../components/JumpCard/JumpCard'
import { Card, Loader, Dimmer, Segment, Image } from 'semantic-ui-react';


export default function JumpFeed({user, jumps, loading, addJumper, removeJumper, isProfile}){
    return(
        <>
    <Card.Group stackable>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : null}
      {jumps.map((jump) => {
        return (
          <JumpCard
            jump={jump}
            key={jump._id}
            user={user}
            isProfile={isProfile}
            addJumper={addJumper}
            removeJumper={removeJumper}
          />
        );
      })}
    </Card.Group>
            
            <h5>for Profile: The jumps I've joined/organized. Organized diff color or icon on them?</h5>
            <h5>For feed, all jumps, but if part of/organized, will show up differently for me.</h5>

        </>
    )
}