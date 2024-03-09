import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'

import HeaderButtons from './HeaderButtons';

const Header: React.FC = () => {
    return (
        <div className="nav-bar flex flex-row gap-10 items-center h-[75px] justify-between w-full ">
            <div className="logo flex justify-center items-center pl-4 w-auto text-nowrap text-4xl max-md:text-xl"> POS APP </div>
            <div className="w-full  " >
                <Input size="large" placeholder="Search" prefix={<SearchOutlined />}  style={{borderRadius: '15px'}} />
            </div>
            <HeaderButtons />
        </div>
    )
}

export default Header