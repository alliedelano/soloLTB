import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Dropdown, Form, Grid, Header, Image, Segment, Icon } from 'semantic-ui-react';

export default function AddDropzoneForm(props){
    const [state, setState] = useState({
        name: "",
        gridId: "",
        gridX: "",
        gridY: "",
    })

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const dropzone = state
        console.log(state, "<-- form data logged")
        props.handleAddDropzone(dropzone)
    }

    return (
        <>
        <Grid textAlign='center'  verticalAlign='top'>
          <Grid.Column style={{ maxWidth: 450 }}>
                          
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>
                <Header as='h2' color="blue" textAlign='center'>
                <Icon name="plane" />Add a Dropzone  
                </Header>
                </Segment>
                <Segment stacked>               
                    <Form.Input
                      name="name"
                      placeholder="name of dropzone"
                      value={state.name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input
                      name="gridId"
                      placeholder="grid ID for weather"
                      value={state.gridId}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input                  
                      name="gridX"
                      placeholder="grid X for weather"
                      value={state.gridX}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input             
                      name="gridY"
                      placeholder="grid Y for weather"
                      value={state.gridY}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="submit"
                      className="btn"
                    >
                    Add Dropzone
                  </Button>
                  </Segment>
                </Form>
               
            </Grid.Column>
          </Grid>
        </>
    )




}