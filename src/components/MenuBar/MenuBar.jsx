import React from 'react';
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function MenuBar(){
    
    
    return(
        <>
            
            <Menu fluid widths={5} pointing>
                <Menu.Item>
                    <Link to="/"><Icon name="home" size="large" /></Link>
                </Menu.Item>
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
        </>
    )
}