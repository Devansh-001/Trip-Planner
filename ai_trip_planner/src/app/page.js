"use client"

import { useSelector } from 'react-redux';
import HeroSection from './Components/HeroSection'
import UserForm from './Auth/UserForm';
import CreateTrip from './Components/CreateTrip';

const page = () => {

  const { user } = useSelector(store => store.appSlice);

  if (!user) {
    return (
      <div className='w-[100vw] h-full md:flex overflow-x-hidden'>
        <HeroSection />
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
