import React from 'react';
import JumpCard from '../../components/JumpCard/JumpCard'
import { Card, Loader, Dimmer, Segment, Image, Button, Divider } from 'semantic-ui-react';
import './JumpFeed.css'
import { Link } from 'react-router-dom'

export default function JumpFeed({user, jumps, loading, addJumper, jumpsExist, removeJumper, isMyJumps, isProfile, deleteJump, isFeed, feedUser}){
    
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
              addJumper={addJumper}
              removeJumper={removeJumper}
              deleteJump={deleteJump}
              feedUser={feedUser}
            />
            );
          })}
        </Card.Group> 
        {!jumpsExist ?
        <> 
          {(isMyJumps) ? 
            <> 
            {loading ? (
              <Segment>
                <Dimmer active inverted>
                  <Loader size="small">Loading</Loader>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment> ) 
            : null}
            <Segment basic textAlign='center'>
              <h3>Looks like you haven't joined any jumps yet!</h3>
              <br />
              <Link to="/newjump"><Button color="blue" icon="plane" content="Organize a Jump"></Button></Link>
              <Divider horizontal><h3>or</h3></Divider>
              <Link to="/dzfeed"><Button color="blue" icon="users" content="Look for Jumps"></Button></Link> 
            </Segment> </> 
          : '' }
          {(isProfile) ?
            <> {loading ? (
              <Segment>
                <Dimmer active inverted>
                  <Loader size="small">Loading</Loader>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            ) : null}
            <h3>This jumper has not joined any jumps yet!</h3> </> 
          : ''}
          {(isFeed) ?
            <>
              {loading ? (
              <Segment>
                <Dimmer active inverted>
                  <Loader size="small">Loading</Loader>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
              ) : null}
            <Segment basic textAlign='center'>
              <h3>Looks like there aren't any jumps yet!</h3>
              <Link to="/newjump"><Button icon="plane" color="blue" content="Organize a Jump"></Button></Link> </Segment></> : '' 
            } 
            </> 
          : ''  }   
        </div>
      </>
    )
}