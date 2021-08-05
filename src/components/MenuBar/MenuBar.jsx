import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import * as permissionApi from '../../utils/permissionApi'

export default function MenuBar({user}){

    const [loading, setLoading] = useState(true)

    const [permissions, setPermissions] = useState([])
    const [admin, setAdmin] = useState(false)
    const [widths, setWidths] = useState(5)

    const history = useHistory()

  async function getPermissions(){
      try {
        const data = await permissionApi.getPermissions(user._id)
        if (data.permissions.length) {
            setPermissions([...data.permissions])
            setAdmin(true)
            setWidths(6)
            setLoading(false)
        } else {
            history.push('/')
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
            <Menu fluid widths={widths}>
                <Menu.Item>
                    <Link to="/"><Icon name="home" size="large" /></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/dzfeed"><Icon name="users" size="large"/></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/weather"><Icon name="sun" size="large"/></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/myjumps"><Icon name="calendar alternate" size="large"/></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/newjump"><Icon name="plane" size="large"/></Link>
                </Menu.Item>
                {admin ? 
                <Menu.Item>
                    <Link to="/newjump"><Icon name="cog" size="large"/></Link>
                </Menu.Item>
                : ""}
            </Menu> }
        </>
    )
}