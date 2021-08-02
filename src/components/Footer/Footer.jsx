import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import "./Footer.css";

export default function Footer({handleLogout}){
    return(
        <Menu fluid widths={2}>
            <Menu.Item>
                <Icon name="user circle" size="large" />
            </Menu.Item>
            <Menu.Item>
                <Icon name="logout" size="large" onClick={handleLogout} color="blue"/>
            </Menu.Item>
        </Menu>
    )
}