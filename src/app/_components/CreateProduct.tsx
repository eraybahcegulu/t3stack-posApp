import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import { Formik, Field, Form, type FieldProps, ErrorMessage } from "formik";
import { api } from 'app/trpc/react';
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';
import NotFoundInfo from './NotFoundInfo';
import LoadingSpinner from './LoadingSpinner';

interface Res {
    message?: string;
    error?: string;
}

const CreateProduct = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data } = api.category.getAll.useQuery();
    const ctx = api.useContext();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const handleOpen = () => {
        onOpen();
    }

    const createProduct = api.product.create.useMutation({
        onSuccess: async (res: Res) => {
            if (res.error) {
                toast.error(res.error)
            } else if (res.message) {
                await ctx.product.getAll.invalidate();
                toast.success(res.message)
            }
            setSelectedCategory('');
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

    if (!data) return <LoadingSpinner />
    if (data?.length === 0) return <NotFoundInfo content={'Category required to new products.'} />

    return (
        <>
            <div className='flex text-white items-center justify-center min-h-[60px] min-w-[100px] max-h-[50px] max-w-[100px] overflow-auto'>
                <span className='w-full flex justify-center items-center '>
                    <IoAdd className='text-5xl  transition-all hover:scale-125 cursor-pointer' onClick={handleOpen} />
                </span>
            </div>
            <Modal
                placement='center'
                size='sm'
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
                                initialValues={{ name: "", image: "", price: "" }}
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
                                    if (parseFloat(values.price) < 0) {
                                        errors.price = "Product price must be greater than 0";
                                    }
                                    return errors;
                                }}
                                onSubmit={async (values) => {
                                    if (!selectedCategory) {
                                        return toast.error('Product category required to create')
                                    }
                                    createProduct.mutate({ 
                                        name: values.name, 
                                        image: values.image, 
                                        price: parseFloat(values.price), 
                                        categoryId: parseInt(selectedCategory) 
                                    });
                                }}
                            >
                                <Form>
                                    <ModalHeader className="flex flex-col gap-1">Create Product</ModalHeader>
                                    <ModalBody>
                                        <div className='flex flex-col gap-3'>

                                            <div>
                                                <Field name="name" component={NameInput} />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>

                                            <div>
                                                <Field name="image" component={ImageInput} />
                                                <ErrorMessage name="image" component="div" className="text-red-500" />
                                            </div>

                                            <Select
                                                label="Select category"
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                {data.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </Select>

                                            <div>
                                                <Field name="price" component={PriceInput} />
                                                <ErrorMessage name="price" component="div" className="text-red-500" />
                                            </div>

                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        {
                                            createProduct.isLoading
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

export default CreateProduct