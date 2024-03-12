"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Image } from "@nextui-org/react";
import { api } from 'app/trpc/react';
import { SiQuicklook } from "react-icons/si";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useState } from "react";
import NotFoundInfo from "./NotFoundInfo";

interface OrderItem {
    id: number;
    product: {
        id: number;
        name: string;
        image: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
    };
    orderId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const SalesTable = () => {
    const { data } = api.order.getAll.useQuery();
    const [order, setOrder] = useState<OrderItem[]>([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = (items: OrderItem[]) => {
        setOrder(items);
        onOpen();
        console.log(items);
    }
    
    if (data && data.length === 0) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <NotFoundInfo content={'Sale not found.'} /> </div>

    const columns = [
        {
            key: "id",
            label: "ORDER ID",
        },
        {
            key: "customer",
            label: "CUSTOMER",
        },
        {
            key: "customerEmail",
            label: "EMAIL",
        },
        {
            key: "createdAt",
            label: "ORDER",
        },
        {
            key: "subTotal",
            label: "SUBTOTAL",
        },
        {
            key: "vat",
            label: "VAT",
        },
        {
            key: "total",
            label: "TOTAL",
        },
        {
            key: "detail",
            label: "DETAIL",
        },
    ];

    const detailColumns = [
        {
            key: "quantity",
            label: "IMAGE",
        },
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "quantity",
            label: "QUANTITY",
        },
        {
            key: "price",
            label: "PRICE",
        },
    ];

    return (
        <>
            <Table className='text-white max-h-[600px]' aria-label="Category table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={data}>
                    {
                        (item) => (
                            <TableRow key={item.id}>
                                {
                                    (columnKey) => {
                                        if (columnKey === "customer") {
                                            return <TableCell>{item.customerName} {item.customerSurname}</TableCell>;
                                        }
                                        if (columnKey === "createdAt") {
                                            return <TableCell>{item.createdAt.toUTCString()}</TableCell>;
                                        }
                                        if (columnKey === "subTotal") {
                                            return <TableCell>€{item.subTotal}</TableCell>;
                                        }
                                        if (columnKey === "vat") {
                                            return <TableCell>€{item.vat}</TableCell>;
                                        }
                                        if (columnKey === "total") {
                                            return <TableCell>€{item.total}</TableCell>;
                                        }
                                        if (columnKey === "detail") {
                                            return <TableCell>
                                                <SiQuicklook
                                                    onClick={() => {
                                                        handleOpen(item.items);
                                                    }}
                                                    className='text-xl text-blue-600 
                                            hover:text-blue-500 hover:scale-110 cursor-pointer transition-all' />
                                            </TableCell>;
                                        }
                                        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                                    }}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

            <Modal
                className='dark text-white min-w-[800px] p-10 items-center'
                placement='center'
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
                            <ModalHeader className="flex flex-col gap-1">DETAIL</ModalHeader>
                            <ModalBody>
                                <Table className="max-h-[500px] w-[500px]">
                                    <TableHeader>
                                        <TableHeader columns={detailColumns}>
                                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                        </TableHeader>
                                    </TableHeader>
                                    <TableBody>
                                        {order?.map((item: OrderItem) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Image
                                                        isZoomed
                                                        width={75}
                                                        height={75}
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="rounded-lg"
                                                    />
                                                </TableCell>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>€{item.product.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

export default SalesTable