import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function WeatherPage({handleLogout}){
    return(
        <>
            <MenuBar />
            <Header />
            <h1>This is the weather page for "your DZ"</h1>
            <Footer handleLogout={handleLogout}/>
        </>
    )
}