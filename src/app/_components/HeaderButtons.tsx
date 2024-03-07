"use client";

import { UserOutlined } from '@ant-design/icons'
import { Badge } from '@nextui-org/react';
import { Avatar } from 'antd'
import { api } from 'app/trpc/react';
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FaBox } from 'react-icons/fa'
import { FiLogOut, FiShoppingCart } from 'react-icons/fi'

const HeaderButtons = () => {
    const { data } = api.category.getAll.useQuery();
    return (
        <>
            <Badge content={0} color="default"  className='max-xl:mr-6' >
                <div className='flex-col justify-center items-center text-4xl max-md:text-xl flex max-xl:mr-8 text-blue-500 '>
                    <FiShoppingCart />
                    <span className='text-sm max-md:text-xs'>Cart</span>
                </div>
            </Badge>

            <div className="flex flex-row justify-center h-20 items-center max-md:gap-7 gap-10 max-xl:z-20 text-4xl max-md:text-xl w-auto max-xl:fixed max-xl:bg-gradient-to-b from-[#ffffff] to-[#ab74d3] bottom-0 max-xl:w-full p-2 ">
                <Badge content={data ? data.length : 0} color="default" className='mr-2'>
                    <div className='flex flex-col justify-center items-center cursor-pointer text-gray-500 hover:scale-110 transition-all'>
                        <BiCategoryAlt />
                        <span className='text-sm max-md:text-xs'>Categories</span>
                    </div>
                </Badge>

                <Badge content={0} color="default">
                    <div className='flex flex-col justify-center items-center cursor-pointer text-violet-500 hover:scale-110 transition-all'>
                        <FaBox />
                        <span className='text-sm max-md:text-xs'>Products</span>
                    </div>
                </Badge>

                <Badge content={0} color="default">
                    <div className='flex flex-col justify-center items-center cursor-pointer text-green-700 hover:scale-110 transition-all'>
                        <BsCurrencyDollar />
                        <span className='text-sm max-md:text-xs'>Sales</span>
                    </div>
                </Badge>


                <div className='flex flex-col justify-center items-center cursor-pointer text-red-600 hover:scale-110 transition-all'>
                    <FiLogOut />
                    <span className='text-sm max-md:text-xs'>Logout</span>
                </div>


                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <Avatar shape="square" size={40} icon={<UserOutlined />} />
                </div>
            </div>
        </>
    )
}

export default HeaderButtons