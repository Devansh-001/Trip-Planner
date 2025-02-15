"use client"

import { Button, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import { useDispatch } from 'react-redux'
import { setAlert } from '../Redux/appSlice'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../../firebase.config'

const UserForm = () => {

    const [userCreds, setUserCreds] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isMounted, setIsMounted] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        setIsMounted(true)
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, userCreds.email, userCreds.password);
            dispatch(setAlert({
                msg: `SignUp Successful.\n Welcome ${res.user.displayName || res.user.email}`,
                type: "success",
                openSnackbar: true
            }));
        }
        catch (e) {
            dispatch(setAlert({
                msg: e.message,
                type: "error",
                openSnackbar: true,
            }));
        }
    }

    const handleSignUpWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            dispatch(setAlert({
                msg: `SignUp Successful.\n Welcome ${res.user.displayName || res.user.email}`,
                type: "success",
                openSnackbar: true
            }));
        }
        catch (e) {
            dispatch(setAlert({
                msg: e.message,
                type: "error",
                openSnackbar: true,
            }));
        }
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='w-[100vw] md:w-[35vw] md:h-screen flex flex-col items-center justify-center'>

            < Image src={"/landing.png"} width={200} height={200} alt='landing' priority />

            <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit}>

                <TextField
                    name='name'
                    placeholder='Enter your name'
                    value={userCreds.name}
                    onChange={(e) => setUserCreds({ ...userCreds, name: e.target.value })}
                    variant="outlined"
                    fullWidth
                    className="bg-white p-1 rounded-lg"
                    required
                    type='text'
                />
                <TextField
                    name='email'
                    placeholder='Enter your email'
                    value={userCreds.email}
                    onChange={(e) => setUserCreds({ ...userCreds, email: e.target.value })}
                    variant="outlined"
                    fullWidth
                    className="bg-white p-1 rounded-lg"
                    required
                    type='email'
                />
                <TextField
                    name='password'
                    placeholder='Enter your password'
                    value={userCreds.password}
                    onChange={(e) => setUserCreds({ ...userCreds, password: e.target.value })}
                    variant="outlined"
                    fullWidth
                    className="bg-white p-1 rounded-lg"
                    required
                    type='password'
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="w-full font-bold text-lg hover:bg-green-500"
                >
                    Get Started
                </Button>

                <span className='text-center font-medium'>OR</span>

                <GoogleButton type='dark' label='Sign up with Google' onClick={handleSignUpWithGoogle} />
            </form>


        </div >
    )
}




export default UserForm