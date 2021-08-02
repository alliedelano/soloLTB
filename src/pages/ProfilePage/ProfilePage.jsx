import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Footer from '../../components/Footer/Footer'
import ProfileBio from '../../components/ProfileBio/ProfileBio'
import JumpFeed from '../../components/JumpFeed/JumpFeed'


export default function ProfilePage({handleLogout}){
    return(
        <>
            <MenuBar />
            <ProfileBio />
            <JumpFeed />
            <Footer handleLogout={handleLogout}/>
        </>
    )
}