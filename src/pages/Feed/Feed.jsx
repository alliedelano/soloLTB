import React from 'react';
import JumpFeed from '../../components/JumpFeed/JumpFeed'
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function Feed({handleLogout}){
    return(
        <>
            <MenuBar />
            <Header />
            <h1>This is the page that displays all upcoming jumps at a DZ.</h1>
            <JumpFeed />
            <Footer handleLogout={handleLogout}/>
        </>

    )
}