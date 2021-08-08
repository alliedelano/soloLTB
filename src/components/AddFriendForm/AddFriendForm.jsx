import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Dropdown, Form, Grid, Header, Image, Segment, Icon, Dimmer, Loader, Select } from 'semantic-ui-react';
import userService from '../../utils/userService'

export default function AddFriendForm({user, jump, handleAddFriend}){

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

    const [selectedUser, setSelectedUser] = useState({})
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        console.log(selectedUser)
        const data = await userService.getOne(selectedUser)
        const formData = new FormData()
        formData.append('username', data.friend.username)
        formData.append('userId', data.friend._id)
        formData.append('userAvatar', data.friend.photoUrl)
        for (var pair of formData.entries()){
            console.log(pair[0] + ', ' + pair[1])
        }
        handleAddFriend(formData)
        
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
                <Icon name="user" />Add a Friend to {jump.name}  
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