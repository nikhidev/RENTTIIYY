"use client"
import Navbar from '@/components/navbar';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { useGetAuthUserQuery } from '@/state/api';
import React from 'react';

const layout = ({children}:{children:React.ReactNode}) => {
  const {data:authUser} = useGetAuthUserQuery();
  console.log('authUser',authUser);
  return (
    <div className='w-full h-full'>
      <Navbar/>
      <main className={`h-full flex w-full flex-col`} style={{paddingTop:`${NAVBAR_HEIGHT}px`}}>{children}</main>
    </div>
  )
}

export default layout
