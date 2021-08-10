import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment, Icon, Dimmer, Loader, Message} from 'semantic-ui-react';
import dropzoneApi from '../../utils/dropzoneApi';
import userService from '../../utils/userService';
import { useHistory, Link } from 'react-router-dom';

export default function SignUpPage(props){
    const [dropzones, setDropzones] = useState([]);
    const [error, setError ] = useState('')
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

    const [experienceList] = useState([
      { key: '0', label: '25+ Jumps', value: 'New!'},
      { key: '50', label: '50+ Jumps', value: '50'},
      { key: '100', label: '100+ Jumps', value: '100'},
      { key: '200', label: '200+ Jumps', value: '200'},
      { key: '300', label: '300+ Jumps', value: '300'},
      { key: '400', label: '400+ Jumps', value: '400'},
      { key: '500', label: '500+ Jumps', value: '500'},
      { key: '1000', label: '1000+ Jumps', value: '1000'},
    ])

    const [expValue, setExpValue] = useState(experienceList[0].value)  
  
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
      <div className="login-signup">  
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
              <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment raised>
                  <Header as="h2" color="blue" textAlign="center" inverted>
                    <Icon name="plane" /> Sign Up 
                  </Header>
                </Segment>
                <Segment stacked> 
                  <Form.Group>             
                    <Form.Input
                      name="firstName"
                      placeholder="first name"
                      value={state.firstName}
                      onChange={handleChange}
                      required
                      width={8} 
                    />
                    <Form.Input
                      name="lastName"
                      placeholder="last name"
                      value={state.lastName}
                      onChange={handleChange}
                      required
                      width={8}
                    />
                  </Form.Group> 
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
                      required
                    >
                      <option value="" disabled selected>Select Home Dropzone</option>
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
                      required
                    >
                      <option value="" disabled selected>Select Experience Level</option>
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
                    <Form.TextArea required placeholder='Tell everyone a bit about yourself' name="bio" onChange={handleChange}/>
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
                      color="blue"
                      fluid
                      size="large"
                      type="submit"
                      className="btn"
                      inverted
                    >
                    Sign Up
                    </Button>
                </Segment>
                {error ? <Segment className="errorMsg" color="red" style={{backgroundColor: '#FFF1F1'}}><ErrorMessage error={error} /></Segment> : null}
              </Form>
              <Message>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
        
        
      );   
    
}
