"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";
import { EditOutlined } from '@ant-design/icons';
import { api } from 'app/trpc/react';
import DeleteCategory from './DeleteCategory';
import NotFoundInfo from './NotFoundInfo';


const CategoriesTable = () => {
    const { data} = api.category.getAll.useQuery();
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
                                                    <Button variant="shadow"> <EditOutlined /></Button>
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
