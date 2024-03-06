import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Input } from 'antd'
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FaBox } from 'react-icons/fa'
import { FiLogOut, FiShoppingCart } from 'react-icons/fi'

const Header: React.FC = () => {
    return (
        <div className="nav-bar flex flex-row gap-10 items-center h-[75px] justify-between w-full ">
            <div className="logo flex justify-center items-center pl-4 w-auto text-nowrap text-4xl"> POS APP </div>
            <div className="w-full  " >
                <Input size="large" placeholder="Search" prefix={<SearchOutlined />} style={{borderRadius: '0'}}/>
            </div>
            
            <div className='flex-col justify-center items-center text-4xl flex max-xl:pr-8 text-blue-500'>
                <FiShoppingCart />
                <span className='text-sm'>Cart</span>
            </div>

            <div className="flex flex-row justify-center h-20 items-center gap-10 text-4xl w-auto max-xl:fixed max-xl:bg-white bottom-0 max-xl:w-full p-2 ">
                <div className='flex flex-col justify-center items-center cursor-pointer text-gray-400  '>
                    <BiCategoryAlt />
                    <span className='text-sm'>Categories</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer text-violet-400 '>
                    <FaBox />
                    <span className='text-sm'>Products</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer text-green-600'>
                    <BsCurrencyDollar />
                    <span className='text-sm'>Sales</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer text-red-600'>
                    <FiLogOut />
                    <span className='text-sm'>Logout</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <Avatar shape="square" size={40} icon={<UserOutlined />} />
                </div>

            </div>
        </div>
    )
}

export default Header