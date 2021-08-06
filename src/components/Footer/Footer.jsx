import React, {createRef} from 'react';
import {Menu, Icon, Image, Sticky, Segment, Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import "./Footer.css";

export default function Footer({user, handleLogout}){
    const contextRef = createRef()
    return(
        <Container 
        style={{
            position: 'sticky',
            bottom: 0
        }}>
        <Sticky pushing >
        <Menu fluid widths={2} >
            <Menu.Item>
               <Link to={`/${user.username}`}>{user.photoUrl ? <Image src={user.photoUrl} circular size="tiny"/> : <Icon name="user circle" size="large" />}</Link>
            </Menu.Item>
            <Menu.Item>
                <Icon name="logout" size="large" onClick={handleLogout} color="blue"/>
            </Menu.Item>
        </Menu>
        </Sticky>
        </Container>

        
    )
}