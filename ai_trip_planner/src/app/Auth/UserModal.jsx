import { Modal, Button, Typography, Avatar, Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setUserModalOpen } from '../Redux/appSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase.config';

const UserModal = () => {
    const { userModal, user } = useSelector((store) => store.appSlice);
    const dispatch = useDispatch();

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

    const handleClose = () => dispatch(setUserModalOpen(!userModal));

    const handleLogout = async () => {
        await signOut(auth);
        handleClose();
        dispatch(setAlert({
            openSnackbar: true,
            msg: "Logout Successful",
            type: "success"
        }))
    };

    return (
        <Modal
            open={userModal}
            onClose={handleClose}
            aria-labelledby="user-modal"
            aria-describedby="user-modal-to-show-user-options"
        >
            <Box sx={style}>

                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Avatar
                        alt="User Profile"
                        src={user?.image || '/default-avatar.png'}
                        sx={{ width: 60, height: 60, margin: '0 auto' }}
                    />
                </div>


                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {user?.displayName &&
                        <Typography variant="h6">{user?.displayName}</Typography>
                    }
                    {user?.email &&
                        <Typography variant={`${user?.displayName ? "body2" : "h6"}`} color="text.secondary">
                            {user?.email}
                        </Typography>
                    }
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            console.log('View Trips clicked');
                            handleClose();
                        }}
                    >
                        View Trips
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            console.log('Create Trip clicked');
                            handleClose();
                        }}
                    >
                        Create New Trip
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        className="text-sm sm:text-base md:text-lg font-bold hover:bg-green-500 w-fit h-fit mx-auto"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default UserModal;
