import { Chip } from '@nextui-org/react'
import React from 'react'

const NotFoundInfo = ({content} : {content:string}) => {
    return (
        <Chip className='m-4 p-4' color="warning" variant="flat">{content} </Chip>
    )
}

export default NotFoundInfo