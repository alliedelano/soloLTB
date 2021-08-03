import React from 'react';
import {Segment, Image, Icon } from 'semantic-ui-react'

export default function Header({user}){
    return(
        <>
            <h5>Hi, {user.firstName}!</h5>
        </>
    )
}
