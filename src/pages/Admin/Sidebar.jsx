import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [activeSide, setActiveSide] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    if (window.location.pathname === "/admin/add_club") setActiveSide("add_club")
    else if (window.location.pathname === "/admin/name") setActiveSide("name")
  },[])
  return (
      <div className='w-fit h-screen flex flex-col bg-neutral-700 py-10'>
      <div className='flex flex-col gap-y-5 w-full justify-center items-center'>
        <img src='/assets/pic.png' alt='admin img' />
        <span className='text-4xl text-white'>اسم الادمن</span>      
      </div>
      <div className='flex flex-col gap-y-10 p-10'>
          <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التحكم بالنوادي</span>
          <span className={`text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="add_club" && "bg-white text-neutral-700 transition-all"}`} onClick={()=>navigate("/admin/add_club")} >اضافه نادي</span>
          <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التحكم  بالصور</span>
          <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التحكم في سياسة الاستخدام</span>
          <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التحكم في الخصوصية</span>
        <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التحكم في مواقع التواصل</span>
        <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التحكم في العموله و السداد </span>
        
          <span className='text-white text-3xl w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2'>التقارير</span>
      </div>
      
    </div>
  )
}

export default Sidebar