import React from 'react';
import AddJumpForm from "../../components/AddJumpForm/AddJumpForm"
import MenuBar from '../../components/MenuBar/MenuBar'
import Footer from '../../components/Footer/Footer'

export default function AddJumpPage({user, handleLogout}){
    return(
        <>
            <MenuBar />
            <AddJumpForm />
            <Footer user={user} handleLogout={handleLogout} />
        </>
    )
}