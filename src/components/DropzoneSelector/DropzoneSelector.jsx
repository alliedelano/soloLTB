import React from 'react';
import { Dropdown } from 'semantic-ui-react'

import dropzonesArr from '../../dropzoneData'

const DropzoneSelector = () => (
    <Dropdown placeholder='select home dropzone' options={dropzonesArr} />
)


export default DropzoneSelector