import { Button, Code } from '@nextui-org/react'
import React from 'react'
import NotFoundInfo from './NotFoundInfo'

const CartSection = () => {
    return (
        <div className="min-w-[300px]  ">
            <div className='flex flex-col  gap-2 items-center w-full h-full'>
                <div className=' h-full bg-gradient-to-tr from-[#020202] to-[#242222] rounded-3xl flex flex-col justify-start items-center  w-full overflow-auto'>
                    <NotFoundInfo content='Cart is empty.' />
                </div>
                <div className='mt-auto w-full justify-center items-center text-center flex flex-col gap-2'>
                    <Button className=" w-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius='full' variant="shadow">
                        Continue
                    </Button>
                    <Button className='w-full' radius='full' color="danger" variant="shadow">
                        Clear
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default CartSection