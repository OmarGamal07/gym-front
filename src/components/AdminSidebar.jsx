import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Sidebar = () => {
  const [activeSide, setActiveSide] = useState("")
  const navigate = useNavigate()
  const cookies = new Cookies();

  useEffect(() => {
    if (window.location.pathname === "/admin/add_club") setActiveSide("add_club")
    else if (window.location.pathname === "/admin/uses") setActiveSide("uses")
    else if (window.location.pathname === "/admin/clubs") setActiveSide("clubs")
    else if (window.location.pathname === "/admin/imgs") setActiveSide("imgs")
    else if (window.location.pathname === "/admin/imgs/web") setActiveSide("imgs")
    else if (window.location.pathname === "/admin/imgs/mop") setActiveSide("imgs")
    else if (window.location.pathname === "/admin/reports") setActiveSide("reports")
    else if (window.location.pathname === "/admin/payments") setActiveSide("payments")
    else if (window.location.pathname === "/admin/socail") setActiveSide("socail")
    else if (window.location.pathname === "/admin/privacy") setActiveSide("privacy")
    else if (window.location.pathname === "/admin/wallet") setActiveSide("wallet")
    else if (window.location.pathname === "/admin/questions") setActiveSide("questions")
    else if (window.location.pathname === "/admin/complaints") setActiveSide("complaints")
    else if (window.location.pathname === "/admin/complaints") setActiveSide("complaints")
    else if (window.location.pathname === "/admin/complaints") setActiveSide("complaints")
    else if (window.location.pathname === "/admin/blog") setActiveSide("blog")
    else if (window.location.pathname === "/admin/opinion") setActiveSide("opinion")
    else if (window.location.pathname === "/admin/blogs") setActiveSide("blogs")
    else if (window.location.pathname === "/admin/opinions") setActiveSide("opinions")
    


  },[])
  return (
    <>
      <div className='w-fit min-h-screen max-h-full md:flex flex-col bg-neutral-700 py-10 hidden sticky'>
      <div className='flex flex-col gap-y-5 w-full justify-center items-center'>
        <img src='/assets/pic.png' alt='admin img' className='w-1/3 '/>
        <span className='lg:text-4xl md:text-2xl text-xl text-white'>{cookies.get('_auth_name')}</span>      
      </div>
      <div className='flex flex-col gap-y-10 p-10 '>
          <span className={`lg:text-3xl md:text-xl text-lg w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="clubs" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/clubs")}>التحكم بالنوادي</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="add_club" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/add_club")} >اضافه نادي</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="imgs" ? "bg-white text-black  transition-all " :"text-white"}`}  onClick={()=>navigate("/admin/imgs")}>التحكم  بالصور</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="uses" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/uses")}>التحكم في سياسة الاستخدام</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="privacy" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/privacy")}>التحكم في سياسة الخصوصيه</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="wallet" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/wallet")}>  وصف محفظه التطبيق</span>
        <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="socail" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/socail")}>التحكم في مواقع التواصل</span>
        <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="payments" ? "bg-white text-black  transition-all " :"text-white"}`} onClick={()=>navigate("/admin/payments")}>التحكم في   السداد </span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="reports" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={()=>navigate("/admin/reports")}> تقارير النوادي</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="questions" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={()=>navigate("/admin/questions")}>الاسئله الشائعه</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="complaints" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={() => navigate("/admin/complaints")}>الشكاوي</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="blog" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={() => navigate("/admin/blog")}>منصه اعلاميه</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="blogs" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={() => navigate("/admin/blogs")}> التحكم منصه اعلاميه  </span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="opinion" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={() => navigate("/admin/opinion")}>اراء العملاء</span>
          <span className={`lg:text-3xl md:text-xl text-lg  w-full text-right  hover:bg-neutral-400 cursor-pointer px-3 py-2 ${activeSide ==="opinions" ? "bg-white text-black  transition-all " :"text-white"}`}onClick={() => navigate("/admin/opinions")}> التحكم اراءالعملاء</span>


 
      </div>
      
      </div>
      </>
  )
}

export default Sidebar