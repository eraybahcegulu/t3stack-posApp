
import React from 'react'

import HeaderButtons from './HeaderButtons';
import SearchProduct from './SearchProduct';

const Header: React.FC = () => {
    return (
        <div className="nav-bar flex flex-row gap-10 items-center h-[75px] justify-between w-full ">
            <div className="logo flex justify-center items-center pl-4 w-auto text-nowrap text-4xl max-md:text-xl"> POS APP </div>
            <SearchProduct />
            <HeaderButtons />
        </div>
    )
}

export default Header