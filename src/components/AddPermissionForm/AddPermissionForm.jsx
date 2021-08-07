import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Dropdown, Form, Grid, Header, Image, Segment, Icon, Dimmer, Loader, Select } from 'semantic-ui-react';
import userService from '../../utils/userService'


export default function AddPermissionForm({user, handleAddPermission}){

    const [permissionTypes] = useState([
        {key: 1, label: 'admin', value: 'admin'},
        {key: 2, label: 'dz organizer', value: 'dz organizer'}
    ])

    const [permissions, setPermissions] = useState({})
    const [allUsers, setAllUsers] = useState([]);
    
    async function getUsers(){
        try {
            const data = await userService.getAll()
            setAllUsers([...data.users]);
            setSelectedUser(data.users[0]._id)
        } catch (err) {
            console.log(err, ' error loading users')
        }
    }

    const [selectedUser, setSelectedUser] = useState('')
    const [selectedPermission, setSelectedPermission] = useState(permissionTypes[0].value)

    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('userId', selectedUser)
        formData.append('type', selectedPermission)
        formData.append('grantedBy', user._id)
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1])
        }
        handleAddPermission(formData)
        history.push('/admin')
    }

    useEffect(() => {
        getUsers();
    }, [])


    return(
        <>
            <Grid textAlign='center' verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 450 }}>            
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>
                <Header as='h2' color="blue" textAlign='center'>
                <Icon name="user" />Add User Permissions  
                </Header>
                </Segment>
                <Segment stacked>               
                    <select
                        value={allUsers.selectValue}
                        onChange={e => setSelectedUser(e.target.value)}
                    >
                        <option value="" disabled selected>Select User</option>
                        {allUsers.map(u => (
                            <option
                            key={u._id}
                            value={u._id}>
                                {u.firstName} {u.lastName}
                            </option>
                        ))}
                    </select>
                    <select
                        value={permissionTypes.selectValue}
                        onChange={e => setSelectedPermission(e.target.value)}
                    >
                        <option value="" disabled selected>Select Permission</option>
                        {permissionTypes.map(p => (
                            <option
                                key={p.key}
                                value={p.value}>
                               {p.label}
                            </option>
                        ))}
                    </select>
                    <Button
                      type="submit"
                      className="btn"
                    >
                    Add Permission
                  </Button>
                  </Segment>
                </Form>
            </Grid.Column>
            </Grid>
        </>
    )
}