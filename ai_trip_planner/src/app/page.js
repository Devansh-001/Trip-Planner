"use client"

import { useSelector } from 'react-redux';
import HeroSection from './Components/HeroSection'
import UserForm from './Auth/UserForm';
import CreateTrip from './Components/CreateTrip';

const page = () => {

  const { user } = useSelector(store => store.appSlice);

  if (!user) {
    return (
      <div className='w-fit h-fit flex flex-1 flex-col md:flex-row overflow-hidden'>
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
