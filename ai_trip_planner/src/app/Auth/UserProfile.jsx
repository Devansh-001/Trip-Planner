import Image from "next/image";
import { useDispatch, useSelector } from "react-redux"
import { setUserModalOpen } from "../Redux/appSlice";

const UserProfile = () => {

    const { user, userModal } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(setUserModalOpen(!userModal))} className="ml-auto sm:mr-7">
            <Image src={user.image} alt="user image" width={50} height={100} className="rounded-full border-2 border-black" />
        </button>
    )
}

export default UserProfile
