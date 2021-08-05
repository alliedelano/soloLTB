import React, { useState, useEffect } from 'react';
import AddDropzoneForm from '../../components/AddDropzoneForm/AddDropzoneForm'
import dropzoneApi from '../../utils/dropzoneApi'
import AddPermissionForm from '../../components/AddPermissionForm/AddPermissionForm'
import * as permissionApi from '../../utils/permissionApi'
import userService from '../../utils/userService'




export default function AdminPage({user}){
    
    const [permissions, setPermissions] = useState({})
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true)
    
    async function getUsers(){
        try {
            const data = await userService.getAll()
            setAllUsers([...data.users]);
            setLoading(false)
        } catch (err) {
            console.log(err, ' error loading users')
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    

    function handleAddDropzone(dropzone){
        console.log(dropzone)
        const data = dropzoneApi.create(dropzone);
    }

    function handleAddPermission(permission){
        console.log(permission)
        const data = permissionApi.create(permission)
    }
     
    return(
        <>
            <h1>Admin Page</h1>
            <AddDropzoneForm handleAddDropzone={handleAddDropzone} />
            <AddPermissionForm user={user} allUsers={allUsers} handleAddPermission={handleAddPermission}/>
            
        </>
        
    )
}