"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

import { api } from 'app/trpc/react';
import DeleteCategory from './DeleteCategory';
import NotFoundInfo from './NotFoundInfo';
import EditCategoryModal from "./EditCategoryModal";


const CategoriesTable = () => {
    const { data } = api.category.getAll.useQuery();

    const columns = [
        {
            key: "name",
            label: "CATEGORY",
        },
        {
            key: "actions",
            label: "ACTIONS",
        },
    ];
    if (data && data.length === 0) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <NotFoundInfo content={'Category not found.'} /> </div>

    return (
        <>
            <Table className='text-white' aria-label="Category table">
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
                                                <TableCell className='flex flex-row gap-2'>
                                                    <EditCategoryModal category={item} />
                                                    <DeleteCategory id={item.id} />
                                                </TableCell>
                                            );
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

export default CategoriesTable;
