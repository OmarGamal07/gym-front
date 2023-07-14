import React from 'react'

const NotFound = () => {
  return (
      <div className='flex justify-center items-center h-screen flex-col gap-y-10'>
          <span className='text-8xl text-black'>404</span>
          <span className='text-3xl text-black'>This Page Not Found</span>
          <button className='text-3xl text-white bg-black px-5 py-2 transition-all hover:text-black hover:bg-white rounded-md border-2 border-black ' onClick={()=>window.location.pathname="/"}>Go Back</button>
    </div>
  )
}

export default NotFound