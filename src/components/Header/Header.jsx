import React from 'react';
import {Image, Icon} from 'semantic-ui-react'
import './Header.css'
import logo from '../../images/SoloLTBlogo.png'
import {Link} from 'react-router-dom'

export default function HeaderComp({user, handleLogout}){
    return(
        <>
            <div className="page-header">
                <div><Link to={`/${user.username}`}><Image className="header-avatar" src={user.photoUrl} avatar circular /></Link></div>
                <div><Link to="/"><img className="logo" src={logo}/></Link></div>
                <div onClick={handleLogout} className="logout">
                    <Icon name="logout" size="large" color="blue"/>Log Out
                </div>
            </div>
        </>
    )
}
