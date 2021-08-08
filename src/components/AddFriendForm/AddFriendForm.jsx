import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Dropdown, Form, Grid, Header, Image, Segment, Icon, Dimmer, Loader, Select } from 'semantic-ui-react';
import userService from '../../utils/userService'

export default function AddFriendForm({user}){

    const [friends, setFriends] = useState([]);
    
    async function getFriends(){
        try {
            const data = await userService.getFriends(user.homeDz)
            setFriends(data.friends);
            setSelectedUser(data.friends[0]._id)
        } catch (err) {
            console.log(err, ' error loading friends')
        }
    }

    const [selectedUser, setSelectedUser] = useState('')
    const history = useHistory()

    function handleSubmit(e){
        console.log('handle submit')
    }

    useEffect(() => {
        getFriends();
    }, [])

    return(
        <>
            <Grid textAlign='center' verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 450 }}>            
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>
                <Header as='h5' color="blue" textAlign='center'>
                <Icon name="user" />Add Friend to Jump  
                </Header>
                </Segment>
                <Segment stacked>               
                    <select
                        value={friends.selectValue}
                        onChange={e => setSelectedUser(e.target.value)}
                    >
                        <option value="" disabled selected>Select User</option>
                        {friends.map(u => (
                            <option
                            key={u._id}
                            value={u._id}>
                                {u.firstName} {u.lastName} - {u.username}
                            </option>
                        ))}
                    </select>
                    <br />
                    <Button
                      type="submit"
                      className="btn"
                      color="blue"
                    >
                    Add Friend to Jump
                  </Button>
                  </Segment>
                </Form>
            </Grid.Column>
            </Grid>
        </>


    )

}