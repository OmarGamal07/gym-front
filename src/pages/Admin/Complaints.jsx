import React, { useEffect } from 'react'
import Sidebar from '../../components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { GetComplaintshandler } from '../../apis/admin/Complaints';
import { CircularProgress } from '@mui/material';

const Complaints = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.Complaints)
  useEffect(() => {
    dispatch(GetComplaintshandler());
  }, [dispatch])
  return (
      <div className='flex'>
                <div className='flex-1 flex flex-col max-h-screen'>
        <span className='text-2xl text-center bg-neutral-700 px-5 py-3  text-white  w-full '>الشكاوي</span>
          <div className=' grid grid-cols-4  bg-neutral-700 mt-5 mx-5 rounded-t-lg'>
            <span className='md:text-xl text-sm text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>الشكوي</span>
            <span className='md:text-xl text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>الايميل </span>
            <span className='md:text-xl text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>رقم الهاتف</span>
            <span className='md:text-xl text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>اسم المستخدم</span>
        </div>
                <div className=' bg-neutral-700  mx-5 h-full overflow-auto rounded-b-lg'> 
             {state.data.reports ? state.data.reports.length > 0 ? state.data.reports.map((q) => {
          return (
              <div className='grid grid-cols-4 justify-center items-center' key={q._id}>
            <span className='md:text-xl text-xs overflow-hidden  text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>{q.message} </span>
            <span className='md:text-xl text-xs overflow-hidden text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>{q.email } </span>
              <span className='md:text-xl text-xs overflow-hidden  text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>{q.phone }</span>
              <span className='md:text-xl text-xs overflow-hidden  text-center text-white border-r-2 border-b-2 px-3 py-3 border-white border-dashed'>{ q.name}</span>
          </div>
            )
          }) : <div className='flex justify-center text-white font-bold items-center h-full'>لا توجد شكاوي</div> : <div className='flex justify-center font-bold items-center h-full'><CircularProgress style={{color: 'white'}} /></div>}
      </div>
        </div>
            <Sidebar/>
    </div>
  )
}

export default Complaints