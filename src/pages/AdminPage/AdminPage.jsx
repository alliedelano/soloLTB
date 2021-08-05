import React, { useState, useEffect } from 'react';
import AddDropzoneForm from '../../components/AddDropzoneForm/AddDropzoneForm'
import dropzoneApi from '../../utils/dropzoneApi'
import AddPermissionForm from '../../components/AddPermissionForm/AddPermissionForm'
import * as permissionApi from '../../utils/permissionApi'
import userService from '../../utils/userService'




export default function AdminPage({user}){
    
    
    const [loading, setLoading] = useState(true)

    

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
            <AddPermissionForm user={user} handleAddPermission={handleAddPermission}/>
            
        </>
        
    )
}