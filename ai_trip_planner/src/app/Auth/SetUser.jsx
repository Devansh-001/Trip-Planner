import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../../../firebase.config'
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/appSlice'

const SetUser = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    image: user.photoURL
                }));
            }
            else {
                dispatch(setUser(null));
            }
        })
        return () => unsubscribe();
    }, [dispatch])


    return (
        <div>
        </div>
    )
}

export default SetUser
