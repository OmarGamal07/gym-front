import React,{useState,useEffect} from 'react'
import Cookies from 'universal-cookie'

const ClubSidebar = () => {
  const cookies = new Cookies();
  const [activeSide, setActiveSide] = useState("")
  useEffect(() => {
    if (window.location.pathname === "/club/edit") setActiveSide("edit_club")
    else if (window.location.pathname === "/club/report") setActiveSide("report")
    else if (window.location.pathname === "/club/subscribe") setActiveSide("subscribe")
    else if (window.location.pathname === "/club/verify_player") setActiveSide("verify_player")
  },[])
  return (
    <>
      <div className=' min-w-lg min-h-screen max-h-full md:flex flex-col bg-neutral-700 py-10 hidden'>
      <div className='flex flex-col gap-y-5 w-full justify-center items-center'>
        <img src='/assets/pic.png' alt='admin img' className='w-1/3 '/>
        <span className='lg:text-4xl md:text-2xl text-xl text-white'>{cookies.get("_auth_name")}</span>      
      </div>
      <div className='flex flex-col gap-y-10 p-10 '>
          <span className={`lg:text-3xl sm:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide === "edit_club" ? "bg-white text-black  transition-all " : "text-white"}`} onClick={() => window.location.pathname = "/club/edit"}> تعديل بيانات النادي</span>
          <span className={`lg:text-3xl sm:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="subscribe" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>window.location.pathname="/club/subscribe"} >اضافه باقه اشتراك</span>
          <span className={`lg:text-3xl sm:text-xl text-lg w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="verify_player" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>window.location.pathname="/club/verify_player"}>التحقق من لاعب</span>
          <span className={`lg:text-3xl sm:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="report" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>window.location.pathname="/club/report"}>التقارير</span>
        </div>
      
      </div>
      </>
  )
}

export default ClubSidebar