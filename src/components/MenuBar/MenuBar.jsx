import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Menu, Icon, Container, Sticky, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import * as permissionApi from '../../utils/permissionApi'
import logo from '../../images/SoloLTBlogo.png'

export default function MenuBar({user, handleLogout}){

    const [loading, setLoading] = useState(true)

    const [permissions, setPermissions] = useState([])
    const [admin, setAdmin] = useState(false)
    const [widths, setWidths] = useState(3)

    const history = useHistory()

  async function getPermissions(){
      try {
        const data = await permissionApi.getPermissions(user._id)
        if (data.permissions.length) {
            setPermissions([...data.permissions])
            setAdmin(true)
            setWidths(4)
            setLoading(false)
        } else {
            setLoading(false)

        }
        
      } catch (err){
        console.log("error getting permissions")
      }
    }

    useEffect(() => {
        getPermissions()
    }, [])

    
    return(
        <>
            {loading ? <h1>Loading...</h1> :
            <Container 
            style={{
                position: 'sticky',
                top: 0
            }}>
            <Sticky pushing>
            <Menu widths={widths}>
            <Menu.Item>
               <Link to={`/${user.username}`}>{user.photoUrl ? <Image src={user.photoUrl} circular size="mini"/> : <Icon name="user circle" size="large" />}</Link>
               Hi, {user.firstName}!
            </Menu.Item>
            <Menu.Item >
                <div id="logo">
                    <Image src={logo} />
                </div>
            </Menu.Item>
                
                {admin ? 
                <Menu.Item>
                    <Link to="/admin"><Icon name="cog" size="large"/></Link>
                </Menu.Item>
                : ""}
            <Menu.Item>
                Log Out <Icon name="logout" size="large" onClick={handleLogout} color="blue"/>
            </Menu.Item>
            </Menu> 
            </Sticky>
            </Container>}
        </>
    )
}