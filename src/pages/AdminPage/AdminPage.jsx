import React, { useState, useEffect } from 'react';
import AddDropzoneForm from '../../components/AddDropzoneForm/AddDropzoneForm'
import dropzoneApi from '../../utils/dropzoneApi'
import AddPermissionForm from '../../components/AddPermissionForm/AddPermissionForm'
import * as permissionApi from '../../utils/permissionApi'
import userService from '../../utils/userService'
import './AdminPage.css'

import {useHistory} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import HeaderComp from '../../components/Header/Header'
import {Grid} from 'semantic-ui-react'




export default function AdminPage({user, handleLogout}){
    
    
    const [loading, setLoading] = useState(true)

    const [permissions, setPermissions] = useState([])

    const history = useHistory()

  async function getPermissions(){
      try {
        const data = await permissionApi.getPermissions(user._id)
        if (data.permissions.length) {
            setPermissions([...data.permissions])
            setLoading(false)
        } else {
            history.push('/')
        }
        
      } catch (err){
        console.log("error getting permissions")
      }
    }

    function handleAddDropzone(dropzone){
        console.log(dropzone)
        const data = dropzoneApi.create(dropzone);
    }

    

    useEffect(() => {
        getPermissions()

    }, [])
     
    return(
        <>
        {loading ? <h1>Loading</h1> :
        <>
        
            <HeaderComp user={user} handleLogout={handleLogout}/>
            <div className="admin-page">
                <h1 className="admin-header">Admin Portal</h1>
            
                <AddDropzoneForm handleAddDropzone={handleAddDropzone} />
                <br />
                <br />
                <br />
                <AddPermissionForm user={user} handleAddPermission={handleAddPermission}/> 
            
    
            </div>
            <Footer user={user}  />
            </> 
            }
        </>
        
    )
}