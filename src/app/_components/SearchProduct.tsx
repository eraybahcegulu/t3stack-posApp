"use client";

import { SearchOutlined } from '@ant-design/icons'
import Input from 'antd/es/input/Input'
import React from 'react'
import {useSearchStore} from '../zustand/searchStore'

const SearchProduct = () => {
    const { setText } = useSearchStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div className="w-full" >
            <Input onChange={handleInputChange} size="large" placeholder="Search" prefix={<SearchOutlined />} style={{ borderRadius: '15px' }} />
        </div>
    )
}

export default SearchProduct