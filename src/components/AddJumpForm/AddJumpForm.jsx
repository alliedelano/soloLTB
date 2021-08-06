import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Dropdown, Form, Grid, Header, Image, Segment, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import * as jumpApi from '../../utils/jumpApi'

export default function AddJumpForm({user, dropzone}){
    const [state, setState] = useState({
        name: '',
        slots: '',
        description: ''
    })

    const [date, setDate] = useState('')

    //const [disciplines, setDisciplines] = useState(["oogabooga"])

    const history = useHistory()
    
    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    

    // function handleDisciplineChange(e){
    //     setDisciplines([
    //         ...disciplines,
    //         e.target.option
    //     ])
    // }

    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('date', date)
        formData.append('dropzone', dropzone._id)
        formData.append('organizer', user._id)
        formData.append('dzName', dropzone.name)
        formData.append('username', user.username)
        for (let key in state){
            formData.append(key, state[key])
        }
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1])
        }
        try {
            await jumpApi.create(formData);
            history.push('/myjumps')
            
        } catch(err){
            console.log(err.message)
        }
    }




    return(
        <>  
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
          <Grid.Column style={{ maxWidth: 450 }}>
                <br />
                <Segment raised>
                  <Header as="h2" color="blue" textAlign="center" inverted>
                    <Icon name="plane" /> Organize a Jump
                  </Header>
                </Segment>    
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>               
                    <Form.Input
                      name="name"
                      placeholder="name of jump"
                      value={state.name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input type="date"
                       name="date"
                       value={date}
                       onChange={e => setDate(e.target.value)}
                    />
                    
                    <Form.Input placeholder="number of slots" type="number" name="slots" value={state.slots} onChange={handleChange}/>
                    <Form.TextArea placeholder='Describe the jump' name='description' value={state.description} onChange={handleChange}/>
                    
                    <Button
                      color="blue"
                      fluid
                      size="large"
                      type="submit"
                      className="btn"
                      inverted
                    >
                    Add Jump
                  </Button>
                  </Segment>
                </Form>
               
            </Grid.Column>
          </Grid>
        </>
    )
}