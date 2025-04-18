"use client"
import React, { useContext } from 'react'
import { MyContext } from '@/app/context/myContext'

function Sidebar() {
  const {open_sidebar} = useContext(MyContext);
  return (
    <div className={`${open_sidebar ? "left-0" : "-left-[60px]" } absolute top-0 w-[60px] h-full bg-[#E9F3FF] opacity-70 transition-all duration-200`}>

    </div>
  )
}

export default Sidebar