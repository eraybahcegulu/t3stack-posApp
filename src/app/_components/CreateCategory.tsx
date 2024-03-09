import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Formik, Field, Form, type FieldProps, ErrorMessage } from "formik";
import { api } from 'app/trpc/react';
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

interface Res {
    message?: string;
    error?: string;
}

const CreateCategory = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ctx = api.useContext();
    const handleOpen = () => {
        onOpen();
    }

    const createCategory = api.category.create.useMutation({
        onSuccess: async (res: Res) => {
            if (res.error) {
                toast.error(res.error)
            } else if (res.message) {
                await ctx.category.getAll.invalidate();
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
            <div className='flex text-white items-center justify-center min-h-[60px] min-w-[100px] max-h-[50px] max-w-[100px] overflow-auto'>
                <span className='w-full flex justify-center items-center '>
                    <IoAdd className='text-5xl  transition-all hover:scale-125 cursor-pointer' onClick={handleOpen} />
                </span>
            </div>
            <Modal
                placement='center'
                size='xs'
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
                            <Formik
                                initialValues={{ name: "" }}
                                validate={values => {
                                    const errors: { name?: string } = {};
                                    if (values.name.length === 0) {
                                        errors.name = "Category required to create";
                                    }
                                    return errors;
                                }}
                                onSubmit={async (values) => {
                                    createCategory.mutate({ name: values.name });
                                }}
                            >
                                <Form>
                                    <ModalHeader className="flex flex-col gap-1">Create Category</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <Field name="name" component={NameInput} />
                                            <ErrorMessage name="name" component="div" className="text-red-500" />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        {
                                            createCategory.isLoading
                                                ?
                                                <LoadingButton color={'primary'} />
                                                :
                                                <Button type='submit' color="primary">
                                                    Create
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
    return <Input maxLength={20} {...field} variant='bordered' label="Category" />;
};

export default CreateCategory