import React from 'react';
import {Menu, Icon, Image} from 'semantic-ui-react';
import "./Footer.css";

export default function Footer({user, handleLogout}){
    return(
        <Menu fluid widths={2}>
            <Menu.Item>
                {user.photoUrl ? <Image src={user.photoUrl} circular size="tiny"/> : <Icon name="user circle" size="large" />}
            </Menu.Item>
            <Menu.Item>
                <Icon name="logout" size="large" onClick={handleLogout} color="blue"/>
            </Menu.Item>
        </Menu>
    )
}