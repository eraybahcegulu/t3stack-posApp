import { Chip } from '@nextui-org/react'
import React from 'react'

const NotFoundInfo = ({name} : {name:string}) => {
    return (
        <Chip color="warning" variant="flat">{name} not found.</Chip>
    )
}

export default NotFoundInfo