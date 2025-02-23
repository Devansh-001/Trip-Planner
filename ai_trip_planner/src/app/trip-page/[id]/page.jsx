"use client";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase.config";
import { useSelector } from "react-redux";
import InformationSection from "@/app/Components/InformationSection";
import RecommendedHotels from "@/app/Components/RecommendedHotels";
import DailyPlan from "@/app/Components/DailyPlan";

const Page = () => {
    const { id } = useParams();
    const { user } = useSelector((store) => store.appSlice);
    const [trip, setTrip] = useState([]);

    const getData = async () => {
        const docRef = doc(db, "Trips", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

        <div className="flex justify-center p-4">

            <div className='mx-auto  sm:w-[1000px] 2xl:w-[1200px] bg-white rounded-xl shadow-lg'>

                {/* Information Section */}

                <InformationSection trip={trip} />

                {/* RecommendedHotels */}

                <RecommendedHotels trip={trip} />

                {/* DailyPlan */}
                <DailyPlan trip={trip} />

            </div>
        </div>

    );
};

export default Page;
