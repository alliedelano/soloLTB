import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function WeatherPage({user, handleLogout}){
    return(
        <>
            <MenuBar />
            <Header user={user}/>
            <h1>This is the weather page for "your DZ"</h1>
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}