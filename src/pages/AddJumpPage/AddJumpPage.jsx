import React, { useEffect, useState } from 'react';
import AddJumpForm from "../../components/AddJumpForm/AddJumpForm"
import HeaderComp from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import dropzoneApi from '../../utils/dropzoneApi'
import { Grid, Loader } from 'semantic-ui-react'
import './AddJumpPage.css'

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
            <HeaderComp user={user} handleLogout={handleLogout}/>
            <div className="add-jump">
              <br />
              <AddJumpForm user={user} dropzone={dropzone} />
            </div>
            <Footer user={user} />
        </>
    )
}

