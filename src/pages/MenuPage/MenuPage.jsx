import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import {Icon} from 'semantic-ui-react'
import Footer from '../../components/Footer/Footer'

export default function MenuPage({user, handleLogout}){
    return(
        <>
            <MenuBar />
            <Header user={user}/>
            <br />
            <h1><Icon name="users"></Icon> See what's up at the DZ</h1>
            <br />
            <h1><Icon name="sun"></Icon> DZ Weather Forecast</h1>
            <br />
            <h1><Icon name="calendar alternate"></Icon> My Upcoming Jumps</h1>
            <br />
            <h1><Icon name="plane"></Icon> Organize a Jump</h1>
            <br />
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}