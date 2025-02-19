"use client"
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../../firebase.config'
import modalFunc from "../Auth/AuthModal"
import AuthModal from '../Auth/AuthModal'
import { setAlert } from '../Redux/appSlice'

const Navbar = () => {

    const { user } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(setAlert({
            openSnackbar: true,
            msg: "Logout Successful",
            type: "success"
        }))
    }


    return (
        <nav className={`border-b w-full h-fit z-30 flex px-10 justify-between items-center`}>

            <Link href={"/"} className='flex items-center'>
                <Image src={"/logo.png"} width={65} height={65} alt='logo' />
                <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold`}>Plan My Escape</h1>
            </Link>

            {user ?
                <Button
                    variant="contained"
                    color="error"
                    className="text-sm sm:text-base md:text-lg font-bold hover:bg-green-500 w-fit h-fit"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
                :
                <AuthModal />
            }

        </nav>
    )
}

export default Navbar
