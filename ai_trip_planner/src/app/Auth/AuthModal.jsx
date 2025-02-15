import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { setAlert } from '../Redux/appSlice';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase.config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [creds, setCreds] = React.useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await signInWithEmailAndPassword(auth, creds.email, creds.password);
            console.log(res)
            dispatch(setAlert({
                msg: `SignIn Successful.\n Welcome ${res.user.displayName || res.user.email}`,
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

    const handleGoogleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            dispatch(setAlert({
                msg: `SignIn Successful.\n Welcome ${res.user.displayName || res.user.email}`,
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

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                className="text-lg font-bold hover:bg-green-500 w-fit h-fit"
                onClick={handleOpen}
            >
                Login
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}
                    >

                        <TextField
                            name='email'
                            placeholder='Enter your email'
                            value={creds.email}
                            variant="outlined"
                            fullWidth
                            className="bg-white p-1 rounded-lg"
                            type='email'
                            required
                            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                        />
                        <TextField
                            name='password'
                            placeholder='Enter your password'
                            value={creds.password}
                            variant="outlined"
                            fullWidth
                            className="bg-white p-1 rounded-lg"
                            required
                            type='password'
                            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            className="w-full font-bold text-lg hover:bg-green-500"
                        >
                            Log In
                        </Button>

                        <span className='text-center font-medium'>OR</span>

                        <GoogleButton type="dark" style={{ width: 'full%' }} onClick={handleGoogleSignIn} />
                    </form>

                </Box>
            </Modal>
        </div >
    );
}
