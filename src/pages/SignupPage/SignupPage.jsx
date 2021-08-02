import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Dropdown, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import DisciplineSelector from '../../components/DisciplineSelector/DisciplineSelector';
import DropzoneSelector from '../../components/DropzoneSelector/DropzoneSelector';
import dropzoneApi from '../../utils/dropzoneApi';
import ExperienceSelector from '../../components/ExperienceSelector/ExperienceSelector'

import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';


export default function SignUpPage(props){
    const [dropzones, setDropzones] = useState([]);
    const [error, setError ] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        homeDz: '',
        experience: '',
        disciplines: '',
        bio: ''
    })

    const history = useHistory()
    
    async function getDropzones(){
        try {
            const data = await dropzoneApi.getAll();
            setDropzones([...data.dropzones]);
        } catch (err) {
            console.log(err, " error loading DZs")
        }
    }
    
    // useEffect(() => {
    //     getDropzones();
    // }, [])
    

    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }

    function handleFileInput(e){
      setSelectedFile(e.target.files[0])
    }

    async function handleSubmit(e){
      e.preventDefault();
      const formData = new FormData();
      formData.append('photo', selectedFile);
      for (let key in state){
        formData.append(key, state[key]);
      }
      try {
        await userService.signup(formData);
        props.handleSignUpOrLogin();
        history.push('/')
      } catch(err){
        console.log(err.message)
        setError(err.message)
      }
    }
    

    return (
        <>
             
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='https://i.imgur.com/s4LrnlU.png' /> Sign Up    
              </Header>            
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>               
                    <Form.Input
                      name="firstName"
                      placeholder="first name"
                      value={state.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input
                      name="lastName"
                      placeholder="last name"
                      value={state.lastName}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input
                      type="email"                  
                      name="email"
                      placeholder="email"
                      value={ state.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input             
                      name="password"
                      type="password"
                      placeholder="password"
                      value={ state.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input     
                      name="passwordConf"
                      type="password"
                      placeholder="confirm password"
                      value={ state.passwordConf}
                      onChange={handleChange}
                      required
                    />
                    {/* <Form.Field value={state.homeDz}>
                        <DropzoneSelector dropzones={dropzones}/>
                    </Form.Field>
                    <Form.Field>
                       <ExperienceSelector />
                    </Form.Field>
                    <Form.Field value={state.disciplines}>
                        <DisciplineSelector />
                    </Form.Field>  */}
                    <Form.TextArea label='bio' placeholder='Tell everyone a bit about yourself' name="bio" onChange={handleChange}/>
                    <Form.Field> 
                        <Form.Input
                          type="file"
                          name="photo"
                          placeholder="upload profile picture"
                          onChange={handleFileInput}
                          required
                        />      
                    </Form.Field>
                    <Button
                      type="submit"
                      className="btn"
                    >
                    Signup
                  </Button>
                  </Segment>
                  {error ? <ErrorMessage error={error} /> : null}
                </Form>
               
            </Grid.Column>
          </Grid>
        </>
        
        
      );   
    
}
