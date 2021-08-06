import React, { useState, useEffect } from 'react';
import AddDropzoneForm from '../../components/AddDropzoneForm/AddDropzoneForm'
import dropzoneApi from '../../utils/dropzoneApi'
import AddPermissionForm from '../../components/AddPermissionForm/AddPermissionForm'
import * as permissionApi from '../../utils/permissionApi'
import userService from '../../utils/userService'
import MenuBar from '../../components/MenuBar/MenuBar'
import {useHistory} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'




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

    function handleAddPermission(permission){
        console.log(permission)
        const data = permissionApi.create(permission)
    }

    useEffect(() => {
        getPermissions()

    }, [])
     
    return(
        <>
        {loading ? <h1>Loading</h1> :
        <>
            <MenuBar user={user}/>
            <h1>Admin Page</h1>
            <AddDropzoneForm handleAddDropzone={handleAddDropzone} />
            <AddPermissionForm user={user} handleAddPermission={handleAddPermission}/> 
            <Footer user={user} handleLogout={handleLogout} />
            </> }
        </>
        
    )
}