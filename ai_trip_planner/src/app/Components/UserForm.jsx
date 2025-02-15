"use client"

import { Button, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'

const UserForm = () => {

    const [userCreds, setUserCreds] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userCreds)
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
                />
                <TextField
                    name='email'
                    placeholder='Enter your email'
                    value={userCreds.email}
                    onChange={(e) => setUserCreds({ ...userCreds, email: e.target.value })}
                    variant="outlined"
                    fullWidth
                    className="bg-white p-1 rounded-lg"
                />
                <TextField
                    name='password'
                    placeholder='Enter your password'
                    value={userCreds.password}
                    onChange={(e) => setUserCreds({ ...userCreds, password: e.target.value })}
                    variant="outlined"
                    fullWidth
                    className="bg-white p-1 rounded-lg"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="w-full font-bold text-lg hover:bg-green-500"
                >
                    Get Started
                </Button>

                <span className='text-center'>OR</span>

                <GoogleButton type='light' />
            </form>


        </div >
    )
}




export default UserForm