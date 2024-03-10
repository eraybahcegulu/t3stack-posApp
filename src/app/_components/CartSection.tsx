"use client";

import { Button, Chip, Code } from '@nextui-org/react'
import React from 'react'
import NotFoundInfo from './NotFoundInfo'
import { ArrowRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Image } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from '../store';
import { increaseQuantity, decreaseQuantity, clearCart } from '../redux-toolkit/cartSlice'

const CartSection = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="min-w-[300px]">
            <div className='flex flex-col gap-2 items-center w-full h-full'>
                <div className='h-full bg-gradient-to-tr p-2 gap-5 max-md:max-h-[175px] from-[#020202] to-[#242222] rounded-3xl flex flex-col justify-start items-center w-full overflow-auto'>
                    {cart.products.length === 0 ? (
                        <NotFoundInfo content='Cart is empty.' />
                    ) : (
                        cart.products.map((product) => (
                            <div key={product.id} className="w-full  flex flex-col border-b border-white p-2 pb-4">
                                <div className='flex flex-row justify-between w-full'>
                                    <div className='flex flex-col gap-1'>
                                        <Image
                                            isZoomed
                                            width={100}
                                            height={100}
                                            src={product.image}
                                            alt={product.name}
                                            className="rounded-lg"
                                        >
                                        </Image>
                                        <span>{product.name}</span>
                                        <span>€{product.price}</span>
                                    </div>

                                    <div className=' flex flex-col justify-center gap-1 items-center'>
                                        <Chip onClick={() => dispatch(increaseQuantity(product))}
                                            className='hover:scale-105 transition-all cursor-pointer' color="warning" variant="shadow" > <PlusOutlined className='text-2xl p-1' /></Chip>
                                        <span className='text-3xl pb-0'>  {product.quantity} </span>
                                        <Chip onClick={() => dispatch(decreaseQuantity(product))}
                                            className='hover:scale-105 transition-all cursor-pointer' color="warning" variant="shadow"> <MinusOutlined className='text-2xl p-1' /></Chip>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}

                </div>
                <div className='w-full flex flex-col gap-2 mt-auto bg-gradient-to-tr p-4  from-[#020202] to-[#272626] rounded-3xl'>
                    <Code className='w-full flex justify-between' color="warning">
                        <span>SUBTOTAL</span>
                        <span>€{cart.subTotal.toFixed(2)}</span>
                    </Code>
                    <Code className='w-full flex justify-between' color="danger">
                        <span>VAT {cart.vat}%</span>
                        <span>€{(cart.subTotal * cart.vat / 100).toFixed(2)}</span>
                    </Code>
                    <Code className='w-full grow flex justify-between' color="success">
                        <span>TOTAL</span>
                        <span>€{(cart.subTotal + cart.subTotal * cart.vat / 100).toFixed(2)}</span>
                    </Code>
                </div>
                <div className='mt-auto w-full justify-center items-center text-center flex flex-row gap-2'>
                    <Button onClick={() => dispatch(clearCart())} className='w-full' radius='full' color="danger" variant="shadow">
                        Clear
                    </Button>
                    <Button className="w-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius='full' variant="shadow">
                        Continue <ArrowRightOutlined className='font-bold' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartSection