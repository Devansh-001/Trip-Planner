"use client"

import { useSelector } from 'react-redux';
import HeroSection from '../Components/HeroSection'
import UserForm from '../Auth/UserForm';
import CreateTrip from '../Components/CreateTrip';
import { useEffect, useState } from 'react';
import Loader from '../Components/Loader';

const page = () => {

  const { user } = useSelector(store => store.appSlice);
  const [isMobile, setIsMobile] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.outerWidth < 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);


  useEffect(() => {
    setIsMounted(true);
  })

  if (!user && !isMounted) {
    return <>
      <Loader />
    </>
  };

  if (!user) {
    return (
      <div className='w-full md:h-[90.5vh] flex flex-1 flex-col justify-center md:flex-row md:overflow-hidden'>
        {
          !isMobile && <HeroSection />
        }
        <UserForm />
      </div>
    );
  }
  else {
    return (
      <div className='flex justify-center'>
        <CreateTrip />
      </div>
    )
  }

}

export default page;
