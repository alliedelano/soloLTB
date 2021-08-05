import React, { useEffect, useState } from 'react';
import AddJumpForm from "../../components/AddJumpForm/AddJumpForm"
import MenuBar from '../../components/MenuBar/MenuBar'
import Footer from '../../components/Footer/Footer'
import userEvent from '@testing-library/user-event';
import dropzoneApi from '../../utils/dropzoneApi'
import { Grid, Loader } from 'semantic-ui-react'


export default function AddJumpPage({user, handleLogout}){
    const [dropzone, setDropzone] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    async function getDropzone(){
        try {
            const data = await dropzoneApi.getDropzone(user.homeDz);
            setLoading(() => false);
            setDropzone(() => data.dropzone)
        } catch (err) {
            console.log(err)
            setError("Issue getting home dropzone")
        }
    }



    useEffect(() => {
        getDropzone();
    }, [])

    
    if (loading) {
        return (
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Loader size="large" active>
                Loading
              </Loader>
            </Grid.Column>
          </Grid>
        );
    }

    return(
        <>
            <MenuBar user={user} />
            <AddJumpForm user={user} dropzone={dropzone} />
            <Footer user={user} handleLogout={handleLogout} />
        </>
    )
}

//loading before function done