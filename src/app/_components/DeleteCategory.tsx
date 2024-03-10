"use client"

import { DeleteOutlined } from '@ant-design/icons'
import { Button } from '@nextui-org/react'
import { api } from 'app/trpc/react';
import React from 'react'
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

const DeleteCategory = ({ id }: { id: number }) => {
    const ctx = api.useContext();

    const deleteCategory = api.category.delete.useMutation({
        onSuccess: async () => {
            await ctx.category.getAll.fetch();
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return (
        <>
            {
                deleteCategory.isLoading
                    ?
                    <LoadingButton color='danger' />
                    :
                    <Button
                    disabled={deleteCategory.isLoading}
                        onClick={() =>
                        (
                            deleteCategory.mutate({ id }))
                        }
                        color="danger" variant="shadow"> <DeleteOutlined />
                    </Button>
            }
        </>

    )
}

export default DeleteCategory