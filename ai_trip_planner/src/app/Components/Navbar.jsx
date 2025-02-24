"use client"
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../../firebase.config'
import AuthModal from '../Auth/AuthModal'
import { setAlert } from '../Redux/appSlice'
import UserProfile from '../Auth/UserProfile'
import { useRouter } from 'next/navigation'

const Navbar = () => {

    const { user } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(setAlert({
            openSnackbar: true,
            msg: "Logout Successful",
            type: "success"
        }))
        router.replace('/')
    }


    return (
        <nav className={`border-b w-full h-fit z-30 flex px-10 py-2 justify-between items-center`}>

            <Link href={"/"} className='flex items-center'>
                <Image src={"/logo.png"} width={65} height={65} alt='logo' />
                <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold`}>Plan My Escape</h1>
            </Link>

            {user ?
                <>
                    <UserProfile />

                    <Button
                        variant="contained"
                        color="error"
                        className="text-sm sm:text-base md:text-lg hover:bg-green-500 w-fit h-fit"
                        onClick={handleLogout}
                        style={{ fontWeight: 600, display: isMobile ? "none" : "block" }}

                    >
                        Logout
                    </Button>
                </>
                :
                <AuthModal />
            }

        </nav>
    )
}

export default Navbar
