import React, { useState, useEffect } from 'react';
import AddDropzoneForm from '../../components/AddDropzoneForm/AddDropzoneForm'
import dropzoneApi from '../../utils/dropzoneApi'
import AddPermissionForm from '../../components/AddPermissionForm/AddPermissionForm'
import * as permissionApi from '../../utils/permissionApi'
import './AdminPage.css'
import {useHistory} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import HeaderComp from '../../components/Header/Header'

export default function AdminPage({user, handleLogout}){
    
    const [loading, setLoading] = useState(true)
    const [permissions, setPermissions] = useState([])
    const history = useHistory()
    const [dzSuccess, setDzSuccess] = useState(false)
    const [permSuccess, setPermSuccess] = useState(false)

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

    async function handleAddDropzone(dropzone){
        const data = await dropzoneApi.create(dropzone);
        setDzSuccess(true)     
    }

    async function handleAddPermission(permission){
        const data = await permissionApi.create(permission)
        setPermSuccess(true)
    }

    useEffect(() => {
        getPermissions()
    }, [])

    useEffect(() => {

    }, [dzSuccess])
     
    return(
        <>
            {loading ? <h1>Loading</h1> :
                <>
                    <HeaderComp user={user} handleLogout={handleLogout}/>
                    <div className="admin-page">
                        <h1 className="admin-header">Admin Portal</h1>
                        <AddDropzoneForm dzSuccess={dzSuccess} handleAddDropzone={handleAddDropzone} />
                        <br />
                        <br />
                        <br />
                        <AddPermissionForm permSuccess={permSuccess} user={user} handleAddPermission={handleAddPermission}/> 
                    </div>
                    <Footer user={user}  />
                </> 
            }
        </> 
    )
}