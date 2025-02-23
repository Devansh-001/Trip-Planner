"use client"

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../../firebase.config';
import TripCard from '../Components/TripCard';

const page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [userTrips, setUserTrips] = useState([]);
  const { user } = useSelector(store => store.appSlice);
  const router = useRouter();


  const getUserTrips = async () => {
    if (!user && isMounted) {
      router.push("/");
      return;
    }
    const collectionRef = collection(db, "Trips");
    const q = query(collectionRef, where("userEmail", "==", user?.email))
    setUserTrips([]);

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No trips");
      } else {
        querySnapshot.forEach((doc) => {
          setUserTrips(prev => [...prev, doc.data()]);
        });
      }
    } catch (error) {
      console.log("Error getting trips:", error);
    }
  };


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user?.email) {
      getUserTrips();
    }
  }, [isMounted, user?.email]);


  if (!isMounted) {
    return;
  }

  return (
    <div className='w-full'>
      <div className='p-3 py-1 md:p-10'>
        <h2 className='text-2xl md:text-4xl font-medium md:font-bold text-center mb-4'>My Trips</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 w-full'>
          {userTrips?.length > 0 ? userTrips.map((trip, index) => {
            return (
              <TripCard key={index} trip={trip} />
            )
          }) :
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 w-[94vw]'>
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <div key={index} className=' md:p-24 md:py-5 w-[300px] h-[200px] bg-slate-200 rounded-xl animate-pulse shadow-lg p-2 py-5 md:flex md:flex-col md:items-center md:gap-3'>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default page
