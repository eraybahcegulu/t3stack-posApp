import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Code, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, useDisclosure } from '@nextui-org/react'
import { Formik, Field, Form, type FieldProps, ErrorMessage } from "formik";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from '../store';
import { api } from 'app/trpc/react';
import toast from 'react-hot-toast';
import { clearCart } from '../redux-toolkit/cartSlice';
import LoadingButton from './LoadingButton';

interface Res {
    message?: string;
    error?: string;
}

const PaymentModal = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const ctx = api.useContext();
    const handleOpen = () => {
        onOpen();
    }

    const createOrder = api.order.create.useMutation({
        onSuccess: async (res: Res) => {
            if (res.error) {
                toast.error(res.error)
            } else if (res.message) {
                await ctx.order.getAll.fetch();
                toast.success(res.message)
            }
            onClose();
            dispatch(clearCart())
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

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "image",
            label: "IMAGE",
        },
        {
            key: "quantity",
            label: "QUANTITY",
        },
        {
            key: "price",
            label: "PRICE",
        },
        {
            key: "total",
            label: "TOTAL",
        },
        {
            key: "vat",
            label: "VAT %10",
        },
    ];

    return (
        <>
            <Button style={{
                opacity: cart.products.length === 0 ? 0.5 : 1,
                pointerEvents: cart.products.length === 0 ? 'none' : 'auto'
            }} onClick={handleOpen} className="w-full bg-gradient-to-tr from-pink-500 to-yellow-500 
            text-white shadow-lg" radius='full' variant="shadow">
                Continue <ArrowRightOutlined className='font-bold' />
            </Button>

            <Modal
                className='dark text-white'
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

                            <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
                            <ModalBody className='flex flex-row gap-10 p-4'>
                                <div className='flex flex-col gap-5 '>
                                    <Table className='text-white min-w-[725px] max-h-[500px]' aria-label="Category table">
                                        <TableHeader columns={columns}>
                                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                        </TableHeader>
                                        <TableBody items={cart.products}>
                                            {
                                                (item) => (
                                                    <TableRow key={item.id}>
                                                        {
                                                            (columnKey) => {
                                                                if (columnKey === "image") {
                                                                    return (
                                                                        <TableCell >
                                                                            <Image
                                                                                isZoomed
                                                                                src={item.image}
                                                                                alt={item.name}
                                                                                className="rounded-lg h-[75px] w-[100px]"
                                                                            >
                                                                            </Image>

                                                                        </TableCell>
                                                                    )
                                                                }
                                                                if (columnKey === "price") {
                                                                    return <TableCell>€{item.price}</TableCell>;
                                                                }
                                                                if (columnKey === "total") {
                                                                    if (item.quantity !== undefined) {
                                                                        return <TableCell>€{item.price * item.quantity}</TableCell>;
                                                                    } else {
                                                                        return <TableCell>N/A</TableCell>;
                                                                    }
                                                                }
                                                                if (columnKey === "vat") {
                                                                    if (item.quantity !== undefined) {
                                                                        return <TableCell>€{(item.price * item.quantity / 10).toFixed(2)}</TableCell>;
                                                                    } else {
                                                                        return <TableCell>N/A</TableCell>;
                                                                    }
                                                                }
                                                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                                                            }}
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                    <div className='w-full flex justify-end'>
                                        <div className='flex flex-col gap-2'>
                                            <Code className='flex flex-row gap-16 justify-between' color="warning" >
                                                <span>SUBTOTAL</span>
                                                <span>€{cart.subTotal.toFixed(2)}</span>
                                            </Code>
                                            <Code className='flex flex-row gap-16 justify-between' color="danger" >
                                                <span>VAT 10%</span>
                                                <span>€{(cart.subTotal * cart.vat / 100).toFixed(2)}</span>
                                            </Code>
                                            <Code className='flex flex-row gap-16 justify-between' color="success" >
                                                <span>TOTAL</span>
                                                <span>€{cart.total.toFixed(2)}</span>
                                            </Code>
                                        </div>
                                    </div>
                                </div>
                                <Formik
                                    initialValues={{ name: "", surname: "", email: "" }}
                                    validate={values => {
                                        const errors: { name?: string, surname?: string, email?: string } = {};
                                        if (values.name.length === 0) {
                                            errors.name = "Name required to confirm";
                                        }
                                        if (values.surname.length === 0) {
                                            errors.surname = "Surname required to confirm";
                                        }
                                        if (values.email.length === 0) {
                                            errors.email = "Email required to confirm";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values) => {
                                        createOrder.mutate({
                                            customerName: values.name,
                                            customerSurname: values.surname,
                                            customerEmail: values.email,
                                            subTotal: cart.subTotal,
                                            vat: (cart.subTotal * cart.vat / 100),
                                            total: cart.total,
                                            products: cart.products.map(product => ({
                                                id: product.id,
                                                quantity: product.quantity ?? 0
                                            }))
                                        });
                                    }}
                                >
                                    <Form>
                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <Field name="name" component={NameInput} />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>

                                            <div>
                                                <Field name="surname" component={SurnameInput} />
                                                <ErrorMessage name="surname" component="div" className="text-red-500" />
                                            </div>

                                            <div>
                                                <Field name="email" component={EmailInput} />
                                                <ErrorMessage name="email" component="div" className="text-red-500" />
                                            </div>
                                            <div className='w-full flex justify-end items-end'>
                                                {
                                                    createOrder.isLoading
                                                        ?
                                                        <LoadingButton color='secondary' />
                                                        :
                                                        <Button type='submit' color='secondary' variant="shadow">
                                                            Confirm
                                                        </Button>
                                                }
                                            </div>

                                        </div>
                                    </Form>
                                </Formik>
                            </ModalBody>
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

const SurnameInput = ({ field }: FieldProps) => {
    return <Input maxLength={20} {...field} variant='bordered' label="Surname" />;
};

const EmailInput = ({ field }: FieldProps) => {
    return <Input maxLength={40} {...field} variant='bordered' label="Email" />;
};



export default PaymentModal