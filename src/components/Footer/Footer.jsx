import React from 'react';
import {Menu, Icon, Image, Sticky, Segment, Container} from 'semantic-ui-react';
import "./Footer.css";
import {Link} from 'react-router-dom'


export default function Footer(){
    return(
        <Container 
        style={{
            position: 'sticky',
            bottom: 0
        }}>
            <Sticky pushing >
                <Menu fluid widths={4} >
                    <Menu.Item>
                        <Link to="/dzfeed"><Icon name="users" size="large"/></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/weather"><Icon name="sun" size="large"/></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/myjumps"><Icon name="calendar alternate" size="large"/></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/newjump"><Icon name="plane" size="large"/></Link>
                    </Menu.Item>
                </Menu>
            </Sticky>
        </Container> 
    )
}