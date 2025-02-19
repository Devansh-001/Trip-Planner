"use client";

import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase.config";
import { useSelector } from "react-redux";

const Page = () => {
    const { id } = useParams();
    const { user } = useSelector((store) => store.appSlice);
    const [trip, setTrip] = useState([]);

    const getData = async () => {
        const docRef = doc(db, "Trips", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No such document");
        }
    }

    useEffect(() => {
        if (!user) {
            console.log("No user logged in");
            return;
        }
        getData();
    }, [user, id]);

    if (!user) {
        return <div>Please log in to view your trips.</div>;
    }
    
    return (
        <div>
            {trip.length === 0 ? (
                <p>No trips found for this user.</p>
            ) : (
                <>
                {trip?.userSelection?.numOfDays}
                </>
            )}
        </div>
    );
};

export default Page;
