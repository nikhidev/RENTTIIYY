import Navbar from '@/components/navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import React from 'react'



const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-full'>
      <Navbar/>
      <main className={`h-full flex w-full flex-col`} style={{paddingTop:`${NAVBAR_HEIGHT}px`}}>{children}</main>
    </div>
  )
}

export default layout
