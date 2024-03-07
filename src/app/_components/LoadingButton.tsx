import { Button } from '@nextui-org/react'
import React from 'react'

const LoadingButton = ({name}: {name:string}) => {
    return (
        <Button color="primary" isLoading>
            {name}
        </Button>
    )
}

export default LoadingButton