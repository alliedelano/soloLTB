import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Dropdown, Form, Grid, Header, Image, Segment, Icon, Dimmer, Loader, Select } from 'semantic-ui-react';
import DisciplineSelector from '../../components/DisciplineSelector/DisciplineSelector';
import DropzoneSelector from '../../components/DropzoneSelector/DropzoneSelector';
import dropzoneApi from '../../utils/dropzoneApi';
import ExperienceSelector from '../../components/ExperienceSelector/ExperienceSelector'

import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';
import { findAllByTestId } from '@testing-library/react';


export default function SignUpPage(props){
    const [dropzones, setDropzones] = useState([]);
    const [error, setError ] = useState('error')
    const [selectedFile, setSelectedFile] = useState('file')
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    })
    

    // const disciplineOptions = [
    //   { key: 'belly', text: 'Belly', value: 'belly'},
    //   { key: 'freefly', text: 'Freefly', value: 'freefly'}
    // ]

    const [experienceList] = useState([
      { key: '0-50', label: '0-50 Jumps', value: '0-50 jumps'},
      { key: '51-100', label: '51-100 Jumps', value: '51-100 jumps'},
      { key: '101-150', label: '101-150 Jumps', value: '101-150 jumps'},
      { key: '151-200', label: '151-200 Jumps', value: '151-200 jumps'},
    ])

    const [expValue, setExpValue] = useState(experienceList[0].value)  
    
    // const dropzoneOptions = dropzones.map(dropzone => (
    //   {key: dropzone._id, text: dropzone.name, value: dropzone._id}
    // ))

    const [homeDzValue, setHomeDzValue] = useState('')

    const history = useHistory()
    
    async function getDropzones(){
      setLoading(true)  
      try {
            const data = await dropzoneApi.getAll();
            setDropzones([...data.dropzones]);
            setLoading(false)
        } catch (err) {
            console.log(err, " error loading DZs")
        }
    }
    
    useEffect(() => {
        getDropzones();
    }, [])

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
      formData.append('homeDz', homeDzValue);
      formData.append('experience', expValue)
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
          {loading ? (
            <Segment>
              <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
      ) : null}
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Icon name="plane" /> Sign Up    
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
                      name="username"
                      placeholder="username"
                      value={ state.username}
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
                  
                    <select
                      value={dropzones.selectValue}
                      onChange={e => setHomeDzValue(e.target.value)}
                    >
                      {dropzones.map(dz => (
                        <option
                          key={dz._id}
                          value={dz._id}>
                            {dz.name}
                            </option>
                      ))}
                    </select>
                    <br />
                    
                    <select
                      value={experienceList.selectValue}
                      onChange={e => setExpValue(e.target.value)}
                    >
                      {experienceList.map(exp => (
                        <option
                          key={exp.key} 
                          value={exp.value}
                        >
                          I have {exp.label}
                        </option>
                      ))}
                    </select>
                    <br />
                    
                    
                    
                    {/* <Dropdown
                        selected={experience}
                        value={experience}
                        name="experience" 
                        placeholder='select experience level'
                        options={experienceOptions}
                        onClick={() => setExperience(experience)}
                    /> */}
                    {/* <Form.Field value={state.disciplines}>
                      <Dropdown 
                        name="disciplines"
                        placeholder='choose disciplines' 
                        fluid multiple selection options={disciplineOptions} 
                        onChange={handleChange} />
                    </Form.Field> */}
                    <Form.TextArea placeholder='Tell everyone a bit about yourself' name="bio" onChange={handleChange}/>
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
