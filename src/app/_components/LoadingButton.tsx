import { Button } from '@nextui-org/react'
import React from 'react'

const LoadingButton = ({color}: {color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined}) => {
    return (
        <Button color={color} isLoading>
            
        </Button>
    )
}

export default LoadingButton