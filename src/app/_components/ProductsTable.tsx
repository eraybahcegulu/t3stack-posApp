"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { api } from 'app/trpc/react';
import NotFoundInfo from './NotFoundInfo';
import { Image } from "@nextui-org/react";
import DeleteProduct from "./DeleteProduct";
import EditProductModal from "./EditProductModal";


const ProductsTable = () => {
    const { data } = api.product.getAll.useQuery();

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
            key: "price",
            label: "PRICE",
        },
        {
            key: "actions",
            label: "ACTIONS",
        },
    ];

    if (data && data.length === 0) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <NotFoundInfo content={'Product not found.'} /> </div>

    return (
        <>
            <Table

                className='text-white max-h-[400px]' aria-label="Product table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={data}>
                    {
                        (item) => (
                            <TableRow key={item.id}>
                                {
                                    (columnKey) => {
                                        if (columnKey === "actions") {
                                            return (
                                                <TableCell>
                                                    <div className="flex flex-row gap-2">
                                                        <EditProductModal product={item} />
                                                        <DeleteProduct id={item.id} />
                                                    </div>
                                                </TableCell>
                                            );
                                        }
                                        if (columnKey === "image") {
                                            return (
                                                <TableCell >
                                                    <Image
                                                        isZoomed
                                                        width={140}
                                                        height={140}
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded-lg"
                                                    >
                                                    </Image>

                                                </TableCell>
                                            )
                                        }
                                        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                                    }}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default ProductsTable;
