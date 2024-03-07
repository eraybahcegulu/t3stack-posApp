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
            <div className="logo flex justify-center items-center pl-4 w-auto text-nowrap text-4xl max-md:text-xl"> POS APP </div>
            <div className="w-full  " >
                <Input size="large" placeholder="Search" prefix={<SearchOutlined />} style={{borderRadius: '0'}}/>
            </div>
            
            <div className='flex-col justify-center items-center text-4xl max-md:text-xl flex max-xl:pr-8 text-blue-500 '>
                <FiShoppingCart />
                <span className='text-sm max-md:text-xs'>Cart</span>
            </div>

            <div className="flex flex-row justify-center h-20 items-center max-md:gap-7 gap-10 text-4xl max-md:text-xl w-auto max-xl:fixed max-xl:bg-gradient-to-b from-[#ffffff] to-[#ab74d3] bottom-0 max-xl:w-full p-2 ">
                <div className='flex flex-col justify-center items-center cursor-pointer text-gray-500 hover:scale-110 transition-all'>
                    <BiCategoryAlt />
                    <span className='text-sm max-md:text-xs'>Categories</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer text-violet-500 hover:scale-110 transition-all'>
                    <FaBox />
                    <span className='text-sm max-md:text-xs'>Products</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer text-green-700 hover:scale-110 transition-all'>
                    <BsCurrencyDollar />
                    <span className='text-sm max-md:text-xs'>Sales</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer text-red-600 hover:scale-110 transition-all'>
                    <FiLogOut />
                    <span className='text-sm max-md:text-xs'>Logout</span>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <Avatar shape="square" size={40} icon={<UserOutlined />} />
                </div>

            </div>
        </div>
    )
}

export default Header