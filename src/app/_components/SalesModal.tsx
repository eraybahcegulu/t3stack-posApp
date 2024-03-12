"use client";

import { Badge } from '@nextui-org/react'
import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import { api } from 'app/trpc/react'
import { FaEuroSign } from 'react-icons/fa';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import SalesTable from './SalesTable';


const SalesModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading } = api.order.getAll.useQuery();

    const handleOpen = () => {
        onOpen();
    }


    if (isLoading) return <div className='flex flex-col justify-center items-center'>
        <LoadingSpinner />
        <span className='text-sm max-md:text-xs'>Sales</span>
    </div>

    return (
        <>
            <Badge content={data ? data.length : 0} color="default">
                <div onClick={handleOpen} className='flex flex-col justify-center items-center cursor-pointer text-green-700 hover:scale-110 transition-all'>
                    <FaEuroSign />
                    <span className='text-sm max-md:text-xs'>Sales</span>
                </div>
            </Badge>

            <Modal
                className='dark text-white p-10'
                placement='center'
                size='5xl'
                isOpen={isOpen}
                onClose={onClose}
            /*
            classNames={{
                closeButton: "hidden",
            }}
            */
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                <SalesTable />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

export default SalesModal