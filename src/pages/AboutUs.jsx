import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetRulesHandler } from './../apis/rules';

const AboutUs = () => {
  const dispatch = useDispatch();
  const [aboutUs, setAboutUs] = useState();
  useEffect(() => {
    dispatch(GetRulesHandler()).then(response => {
      const rules = response.payload.data.rules.filter(r => r.type === 'uses')
      console.log(rules)
      setAboutUs(rules);
    })
  }, [dispatch])
  return (
    <div className='flex flex-col justify-start mt-20 items-center h-screen gap-y-5 px-10'>
      <div className='flex flex-col items-center gap-y-9 bg-gray-50 shadow-xl rounded-3xl p-5 md:w-9/12'>
        <span className='md:text-4xl text-xl'>نبذة </span>
        <span className='md:text-4xl text-xl text-gray-500 md:mb-10'>GYMS نبذة عن </span>
        <span className='md:text-2xl text-md text-right md:p-5'>{aboutUs ? aboutUs[0].textBody : "Loading..."}</span>
      </div>

    </div>
  )
}

export default AboutUs


