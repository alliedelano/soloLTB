import React, { useState } from 'react';
import AddDropzoneForm from '../../components/AddDropzoneForm/AddDropzoneForm'
import dropzoneApi from '../../utils/dropzoneApi'




export default function AdminPage(props){
    function handleAddDropzone(dropzone){
        console.log(dropzone)
        const data = dropzoneApi.create(dropzone);
    }
     
    return(
        <>
            <h1>Admin Page</h1>
            <AddDropzoneForm handleAddDropzone={handleAddDropzone} />
            
        </>
        
    )
}