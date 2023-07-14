import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie'
import { GetRulesHandler } from './../apis/rules';

const Footer = ({rules}) => {
  const cookies = new Cookies();
  const [img, setImg] = useState();
  const [whatsApp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [insta, setInsta] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (rules) rules.filter(r => r.type === "main_img" && setImg(r))
  }, [rules])

  useEffect(() => {
    dispatch(GetRulesHandler()).then(res => {
      if (res.payload.data) {
        const whatsapp = res.payload.data.rules.filter(
          (rule) => rule.type === "whatsapp"
        );
        const facebook = res.payload.data.rules.filter(
          (rule) => rule.type === "facebook"
        );
        const insta = res.payload.data.rules.filter(
          (rule) => rule.type === "instagram"
        );
        setWhatsapp(whatsapp[0].whatsapp);
        setFacebook(facebook[0].facebook);
        setInsta(insta[0].instagram);
        }
    }) 
  }, [dispatch])
    return (
        <div className='flex flex-row-reverse justify-around items-start text-right bg-orange-50 p-10 '>
        <div className='flex flex-col flex-1 text-right items-end gap-y-5 '>
          <span className='text-2xl  border-b-2 border-b-black w-fit'>GYMs</span>
          <span className='text-xl cursor-pointer hover:text-gray-500' onClick={()=>window.location.pathname="/about_us"}>نبذة</span>
          <span className='text-xl cursor-pointer hover:text-gray-500' onClick={()=>window.location.pathname="/blogs"}>المنصة الإعلامية</span>
          <span className='text-xl cursor-pointer hover:text-gray-500' onClick={()=>window.location.pathname="/contact_us"}>تواصل معنا عبر</span>
          <div className='flex justify-around '>
            <a href={facebook} target='_blank'><img src='/assets/facebook.png' alt='facebook' className='md:w-10 md:h-10 w-7 h-7 cursor-pointer' title='facebook'/></a>
            <a href={insta} target='_blank'><img src='/assets/instagram.png' alt='instagram' className='md:w-10 md:h-10 w-7 h-7cursor-pointer 'title='instagram' /></a>
            <a href={`https://wa.me/${whatsApp}`}><img src='/assets/whatsapp.png' alt='whatsapp' className='md:w-10 md:h-10 w-7 h-7 cursor-pointer' title='whatsapp'/></a>
          </div>
          </div>
        <div className='md:flex  hidden flex-col flex-1 text-right items-end gap-y-5 '>
        <span className='text-2xl  border-b-2 border-b-black w-fit' onClick={()=>window.location.pathname="/contact_us"}>خدمه العملاء</span>  
        <span className='text-xl cursor-pointer hover:text-gray-500' onClick={()=>window.location.pathname="/contact_us"}>للمساعده</span>  
        <span className='text-xl cursor-pointer hover:text-gray-500' onClick={()=>window.location.pathname="/opinions"}> آراء العملاء</span>  
        <span className='text-xl cursor-pointer hover:text-gray-500' onClick={()=>window.location.pathname="/questions"}>أسئلة شائعة</span>  
        <span className='text-xl cursor-pointer hover:text-gray-500'>العروض</span>  
        </div>
        <div className='flex flex-col flex-1 text-right  items-end gap-y-5'>
          <span className='text-2xl  border-b-2 border-b-black w-fit'>الاشتراك بخدمتنا</span>
          <input type='email' placeholder='البريد الالكتروني' className='text-right px-2 py-3 rounded-md md:w-10/12 w-11/12 border-2' />
          <div className='flex flex-col  justify-between items-end'>
            <span className='text-2xl w-fit'>وسائل الدفع المتاحه</span>
            <div className='flex gap-x-2 items-center justify-around'>
              <img src='/assets/tamara.png' alt='tamara' className='md:w-15 md:h-10 w-10 h-5'/>
              <img src='/assets/PayPal1.png' alt='PayPal' className='md:w-20 md:h-8 w-14 h-4 '/>
              <img src='/assets/visa1.png' alt='visa' className='md:w-15 md:h-10 w-10 h-5 '/>
              <img src='/assets/master-card.png' alt='master' className='md:w-10 w-5 '/>
            </div>
          </div>
          </div>
        <div className='md:flex  hidden flex-col flex-1 items-center gap-y-5'>
          <button style={cookies.get('_auth_token') ? {display: 'none'} : {display: 'block'}} className='text-white text-2xl bg-stone-800 w-fit px-6 py-2 rounded-lg' onClick={()=>window.location.pathname="/auth/reg"}>انضم لنا</button>
          <img src='/assets/AppStore.png' alt='App Store' className='w-1/2'/>
          <img src='/assets/GooglePlay.png' alt='Google Play' className='w-1/2'/>
        </div>
          <div className='sm:flex  hidden'><img src={img ? img.main_img : '/assets/Logo.png'} alt='logo'/></div>
        </div>
  )
}

export default Footer