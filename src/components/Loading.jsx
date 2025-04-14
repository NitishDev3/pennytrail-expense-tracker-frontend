import React from 'react'

const Loading = () => {
    // This component can be used to show a loading spinner or animation
    // while data is being fetched or processed.
    // You can customize the spinner or animation as per your design requirements.
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className='text-center text-xl'>Loading...</p>
    </div>
  )
}

export default Loading;