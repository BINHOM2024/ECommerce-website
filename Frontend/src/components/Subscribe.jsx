import React from 'react'

const Subscribe = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }
  return (
      <div className='py-14 flex flex-col gap-2 items-center'>
          <h2 className='font-bold text-2xl'>Subscribe now & get 20% off</h2>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum facere quaerat placeat!</p>
          <form onSubmit={event=>onSubmitHandler(event)} className='flex w-full sm:w-2/3 md:w-1/2 mt-2'>
              <input type="text" placeholder='enter your email' className='border border-gray-400 outline-0 py-1 px-2 w-full' required/>
            <button className='bg-black text-white py-2 px-3 text-base cursor-pointer hover:bg-gray-700'>Subscribe</button>
          </form>
    </div>
  )
}

export default Subscribe