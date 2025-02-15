"use client"
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const { user } = useSelector(store => store.appSlice);

    return (
        <nav className={`${user ? "relative border-b" : "absolute"} w-full z-30 flex px-10 justify-between items-center`}>

            <Link href={"/"} className='flex items-center'>
                <Image src={"/logo.png"} width={100} height={100} alt='logo' />
                <h1 className={`text-3xl ${user ? "text-black" : "text-gray-300"} font-bold`}>Plan My Escape</h1>
            </Link>

            <Button
                variant="contained"
                color="success"
                className="text-lg font-bold hover:bg-green-500 w-fit h-fit"
            >
                Login
            </Button>

        </nav>
    )
}

export default Navbar
