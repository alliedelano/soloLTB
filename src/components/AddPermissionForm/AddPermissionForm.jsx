import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import userService from '../../utils/userService'


export default function AddPermissionForm({user, handleAddPermission, permSuccess}){

    const [permissionTypes] = useState([
        {key: 1, label: 'admin', value: 'admin'},
        {key: 2, label: 'dz organizer', value: 'dz organizer'}
    ])

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
                            <Header as='h3' color="blue" textAlign='center'>
                                <Icon name="user" />Add User Permissions  
                            </Header>               
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
                            <br />
                            <Button
                            type="submit"
                            className="btn"
                            color="blue"
                            >
                            Add Permission
                            </Button>
                            {(permSuccess) ? <h1>Permission added!</h1> : ''}
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    )
}