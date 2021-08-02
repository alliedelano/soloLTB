import React from 'react';
import { Dropdown, Item } from 'semantic-ui-react';



export default function DropzoneSelector({ dropzones }){
    return(
        <select placeholder='select home dropzone'>
            {dropzones.map(dropzone => (
                <option
                    key={dropzone._id}
                    value={dropzone._id}
                >
                    {dropzone.name}
                </option>
            ))}
        </select>
    )
}
