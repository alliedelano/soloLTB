import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import {Icon} from 'semantic-ui-react'
import Footer from '../../components/Footer/Footer'
import {Link} from 'react-router-dom'

export default function MenuPage({user, handleLogout}){
    return(
        <>
            <MenuBar />
            <Header user={user}/>
            <br />
            <Link to="/dzfeed"><h4><Icon name="users" size="huge"></Icon>  <br />See what's up at the DZ</h4></Link>
            <br />
            <Link to="/weather"><h4><Icon name="sun" size="huge"></Icon> <br />DZ Weather Forecast</h4></Link>
            <br />
            <h4><Icon name="calendar alternate" size="huge" color="red"></Icon> <br />My Upcoming Jumps</h4>
            <br />
            <Link to="/newjump"><h4><Icon name="plane" size="huge"></Icon> <br />Organize a Jump</h4></Link>
            <br />
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}
