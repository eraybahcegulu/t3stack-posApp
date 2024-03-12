import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { EditOutlined } from '@ant-design/icons';
import { Formik, Field , Form,  type FieldProps, ErrorMessage } from 'formik';
import { api } from 'app/trpc/react';
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Res {
    message?: string;
    error?: string;
}

const EditCategoryModal = ({ category }: { category: Category }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ctx = api.useContext();
    const handleOpen = () => {
        onOpen();
    }


    const editCategory = api.category.edit.useMutation({
        onSuccess: async (res: Res) => {
            if (res.error) {
                toast.error(res.error)
            } else if (res.message) {
                await ctx.category.getAll.fetch();
                toast.success(res.message)
            }
            onClose();
        },
        onError: (error) => {
            const errorMessage = error.data?.zodError?.fieldErrors.name;
            if (errorMessage?.[0]) {
                toast.error(errorMessage[0]);
            } else {
                toast.error("An error occurred");
            }
            onClose();
        }
    })

    return (
        <>
            <Button onClick={handleOpen} variant="shadow"> <EditOutlined /></Button>
            <Modal
                className='dark text-white'
                size='md'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <Formik
                                initialValues={{ name: category.name }}
                                validate={values => {
                                    const errors: { name?: string } = {};
                                    if (values.name.length === 0) {
                                        errors.name = "Category required to create";
                                    }
                                    if (values.name === category.name) {
                                        errors.name = "This category already exist";
                                    }
                                    return errors;
                                }}
                                onSubmit={async (values) => {
                                    editCategory.mutate({ id: category.id, name: values.name });
                                }}
                            >
                                <Form>
                                    <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <Field name="name" component={NameInput} />
                                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>

                                        {
                                            editCategory.isLoading
                                                ?
                                                <LoadingButton color={'secondary'} />
                                                :
                                                <Button type='submit' variant="shadow"  color="secondary">
                                                    Edit
                                                </Button>
                                        }
                                    </ModalFooter>
                                </Form>
                            </Formik>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

const NameInput = ({ field }: FieldProps) => {
    return <Input maxLength={20} {...field} variant='bordered' label="Name" />;
};

export default EditCategoryModal