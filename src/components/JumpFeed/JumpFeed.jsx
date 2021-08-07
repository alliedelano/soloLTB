import React, {useState, useEffect} from 'react';
import JumpCard from '../../components/JumpCard/JumpCard'
import { Card, Loader, Dimmer, Segment, Image } from 'semantic-ui-react';
import './JumpFeed.css'

export default function JumpFeed({user, jumps, loading, addJumper, removeJumper, isProfile, deleteJump, feedUser}){
    
    const [today, setToday] = useState('')
    

    useEffect(() => {
        let date = new Date()
        console.log(date)
        setToday(date)
    }, [])

    return(
        <>
        <div className="jump-feed">
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
            deleteJump={deleteJump}
            today={today}
            feedUser={feedUser}
          />
          );
      })}
    </Card.Group>
    </div>
        </>
    )
}