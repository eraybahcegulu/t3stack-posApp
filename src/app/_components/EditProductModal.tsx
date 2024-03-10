import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { EditOutlined } from '@ant-design/icons';
import { Formik, Field, Form, type FieldProps, ErrorMessage } from 'formik';
import { api } from 'app/trpc/react';
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Res {
    message?: string;
    error?: string;
}

const EditProductModal = ({ product }: { product: Product }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ctx = api.useContext();
    const handleOpen = () => {
        onOpen();
    }


    const editProduct = api.product.edit.useMutation({
        onSuccess: async (res: Res) => {
            if (res.error) {
                toast.error(res.error)
            } else if (res.message) {
                await ctx.product.getAll.fetch();
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
                                initialValues={{ name: product.name, image: product.image, price: product.price.toString() }}
                                validate={values => {
                                    const errors: { name?: string, image?: string, price?: string } = {};
                                    if (values.name.length === 0) {
                                        errors.name = "Product name required to create";
                                    }
                                    if (values.image.length === 0) {
                                        errors.image = "Product image required to create";
                                    }
                                    if (values.price.length === 0) {
                                        errors.price = "Product price required to create";
                                    }

                                    return errors;
                                }}
                                onSubmit={async (values) => {
                                    if (values.name === product.name && values.image === product.image && parseFloat(values.price) === product.price) {
                                        return toast.error('This Product already exist');
                                    }
                                    editProduct.mutate({ id: product.id, name: values.name, image: values.image, price: parseFloat(values.price) });
                                }}
                            >
                                <Form>
                                    <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                                    <ModalBody>
                                        <div className='flex flex-col gap-2'>
                                            <div >
                                                <Field name="name" component={NameInput} />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>

                                            <div>
                                                <Field name="image" component={ImageInput} />
                                                <ErrorMessage name="image" component="div" className="text-red-500" />
                                            </div>

                                            <div>
                                                <Field name="price" component={PriceInput} />
                                                <ErrorMessage name="price" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>

                                        {
                                            editProduct.isLoading
                                                ?
                                                <LoadingButton color={'secondary'} />
                                                :
                                                <Button type='submit' variant="shadow" color="secondary">
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

const ImageInput = ({ field }: FieldProps) => {
    return <Input maxLength={300} {...field} variant='bordered' label="Image" />;
};

const PriceInput = ({ field }: FieldProps) => {
    return <Input type="number" maxLength={20} {...field}
        placeholder="0.00"
        variant='bordered'
        label="Price"
        startContent={
            <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
            </div>
        }
    />;
};

export default EditProductModal