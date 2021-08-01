import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react'

const options = [
    { key: 'belly', text: 'Belly', value: 'belly'},
    { key: 'freefly', text: 'Freefly', value: 'freefly'}
]

const DisciplineSelector = () => (
    <Dropdown placeholder='choose disciplines' fluid multiple selection options={options} />
)

export default DisciplineSelector
