import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Dropdown, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import DisciplineSelector from '../../components/DisciplineSelector/DisciplineSelector'

export default function AddJumpForm({user, dropzone, handleAddJump}){
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
        for (let key in state){
            formData.append(key, state[key])
        }
        handleAddJump(formData) 
    }




    
    return(
        <>  
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                 Add a Jump  
              </Header>            
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
                    {/* <DisciplineSelector 
                       name="disciplines"
                       value={disciplines}
                       onChange={e => handleDisciplineChange(e.target.option.name)}
                    /> */}
                    <Form.Input type="number" name="slots" value={state.slots} onChange={handleChange}/>

                    
                    <Form.TextArea placeholder='Describe the jump' name='description' onChange={handleChange}/>
                    
                    <Button
                      type="submit"
                      className="btn"
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