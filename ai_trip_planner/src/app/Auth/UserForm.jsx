// "use client"

// import { Button, TextField } from '@mui/material'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import GoogleButton from 'react-google-button'
// import { useDispatch } from 'react-redux'
// import { setAlert } from '../Redux/appSlice'
// import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
// import { auth, googleProvider } from '../../../firebase.config'
// import { motion } from 'framer-motion'

// const UserForm = () => {

//     const [userCreds, setUserCreds] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })
//     const [isMounted, setIsMounted] = useState(false);


//     const dispatch = useDispatch();

//     useEffect(() => {
//         setIsMounted(true)
//     })

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const res = await createUserWithEmailAndPassword(auth, userCreds.email, userCreds.password);
//             dispatch(setAlert({
//                 msg: `SignUp Successful.\n Welcome ${res.user.displayName || res.user.email}`,
//                 type: "success",
//                 openSnackbar: true
//             }));
//         }
//         catch (e) {
//             dispatch(setAlert({
//                 msg: e.message,
//                 type: "error",
//                 openSnackbar: true,
//             }));
//         }
//     }

//     const handleSignUpWithGoogle = async () => {
//         try {
//             const res = await signInWithPopup(auth, googleProvider);
//             dispatch(setAlert({
//                 msg: `SignUp Successful.\n Welcome ${res.user.displayName || res.user.email}`,
//                 type: "success",
//                 openSnackbar: true
//             }));
//         }
//         catch (e) {
//             dispatch(setAlert({
//                 msg: e.message,
//                 type: "error",
//                 openSnackbar: true,
//             }));
//         }
//     }

//     if (!isMounted) {
//         return null;
//     }

//     return (
//         <motion.div
//             className='w-full md:w-[35vw] h-full md:h-[89.5vh] flex flex-col items-center 2xl:gap-10 p-2 2xl:p-10 bg-emerald-300'
//             initial={{ x: "300px", opacity: 0, scale: 0.5, rotate: 60 }}
//             animate={{ x: "0px", opacity: 1, scale: 1, rotate: 0 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}

//         >

//             < Image src={"/landing.png"} width={150} height={100} alt='landing' priority quality={100} className=' w-3/6 sm:w-1/3 lg:1/2' />

//             <form className='flex flex-col gap-3 py-2 lg:p-6 bg-red-200 w-full h-fit' onSubmit={handleSubmit}>

//                 <TextField
//                     name='name'
//                     placeholder='Enter your name'
//                     value={userCreds.name}
//                     onChange={(e) => setUserCreds({ ...userCreds, name: e.target.value })}
//                     fullWidth
//                     className="bg-white p-1 rounded-lg outline-none"
//                     required
//                     type='text'
//                 />
//                 <TextField
//                     name='email'
//                     placeholder='Enter your email'
//                     value={userCreds.email}
//                     onChange={(e) => setUserCreds({ ...userCreds, email: e.target.value })}
//                     fullWidth
//                     className="bg-white p-1 rounded-lg outline-none"
//                     required
//                     type='email'
//                 />
//                 <TextField
//                     name='password'
//                     placeholder='Enter your password'
//                     value={userCreds.password}
//                     onChange={(e) => setUserCreds({ ...userCreds, password: e.target.value })}
//                     fullWidth
//                     className="bg-white p-1 rounded-lg outline-none"
//                     required
//                     type='password'
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="success"
//                     className="w-full font-bold text-lg hover:bg-green-500"
//                 >
//                     Get Started
//                 </Button>

//                 <span className='text-center font-medium'>OR</span>

//                 <GoogleButton type='dark' style={{ fontSize: 15, height: 50, fontWeight: 600, placeSelf: 'center' }} label='Sign up with Google' onClick={handleSignUpWithGoogle} />
//             </form>


//         </motion.div >
//     )
// }




// export default UserForm



"use client"

import { Button, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import { useDispatch } from 'react-redux'
import { setAlert } from '../Redux/appSlice'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../../firebase.config'
import { motion } from 'framer-motion'

const UserForm = () => {
    const [userCreds, setUserCreds] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <motion.div
            className='w-full md:w-[40vw]  flex flex-col items-center justify-center px-8 rounded-xl'
            initial={{ x: "300px", opacity: 0, scale: 0.5, rotate: 60 }}
            animate={{ x: "0px", opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <Image
                src={"/landing.png"}
                width={150}
                height={100}
                alt="landing"
                priority
                quality={100}
                className='w-1/3 lg:w-2/5'
            />

            <form className='w-full rounded-lg flex flex-col gap-2 p-3 ' onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Create Account</h2>

                <TextField
                    name='name'
                    placeholder='Enter your name'
                    value={userCreds.name}
                    onChange={(e) => setUserCreds({ ...userCreds, name: e.target.value })}
                    fullWidth
                    className="rounded-lg"
                    required
                    type='text'
                />
                <TextField
                    name='email'
                    placeholder='Enter your email'
                    value={userCreds.email}
                    onChange={(e) => setUserCreds({ ...userCreds, email: e.target.value })}
                    fullWidth
                    className="rounded-lg"
                    required
                    type='email'
                />
                <TextField
                    name='password'
                    placeholder='Enter your password'
                    value={userCreds.password}
                    onChange={(e) => setUserCreds({ ...userCreds, password: e.target.value })}
                    fullWidth
                    className="rounded-lg"
                    required
                    type='password'
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className=" md:text-base lg:text-lg font-bold rounded-lg hover:bg-green-500 transition-all"
                >
                    Get Started
                </Button>

                <p className='text-center text-gray-600 font-medium'>OR</p>

                <GoogleButton
                    type='dark'
                    style={{ placeSelf: "center" }}
                    label='Sign up with Google'
                    onClick={handleSignUpWithGoogle}
                />
            </form>
        </motion.div>
    );
}

export default UserForm;



