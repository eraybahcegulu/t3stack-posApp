"use client"

import { DeleteOutlined } from '@ant-design/icons'
import { Button } from '@nextui-org/react'
import { api } from 'app/trpc/react';
import React from 'react'
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

const DeleteProduct = ({ id }: { id: number }) => {
    const ctx = api.useContext();

    const deleteProduct = api.product.delete.useMutation({
        onSuccess: async () => {
            await ctx.product.getAll.fetch();
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return (
        <>
            {
                deleteProduct.isLoading
                    ?
                    <LoadingButton color='danger' />
                    :
                    <Button
                    disabled={deleteProduct.isLoading}
                        onClick={() =>
                        (
                            deleteProduct.mutate({ id }))
                        }
                        color="danger" variant="shadow"> <DeleteOutlined />
                    </Button>
            }
        </>

    )
}

export default DeleteProduct