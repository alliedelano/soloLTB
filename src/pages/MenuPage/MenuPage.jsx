import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import HeaderComp from '../../components/Header/Header'
import {Icon} from 'semantic-ui-react'
import Footer from '../../components/Footer/Footer'
import {Link} from 'react-router-dom'
import './MenuPage.css'

export default function MenuPage({user, handleLogout}){
    return(
        <>
            <HeaderComp user={user} handleLogout={handleLogout}/>
            
            
            <div className="menu-page">
                <br />
                <Link class="menu-link" to="/dzfeed"><h4><Icon name="users" size="huge"></Icon>  <br />See what's up at the DZ</h4></Link>
                <br />
                <Link to="/weather"><h4><Icon name="sun" size="huge"></Icon> <br />DZ Weather Forecast</h4></Link>
                <br />
                <Link to="/myjumps"><h4><Icon name="calendar alternate" size="huge"></Icon> <br />My Upcoming Jumps</h4></Link>
                <br />
                <Link to="/newjump"><h4><Icon name="plane" size="huge"></Icon> <br />Organize a Jump</h4></Link>
                <br />
            </div>
            <Footer user={user}/> 
        </>
    )
}
