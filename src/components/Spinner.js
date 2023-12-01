import React from 'react'

const Spinner = () => {
  return (
    <>
        <div className='fixed h-[90vh] w-[100vw] top-16 flex items-center justify-center backdrop-blur-sm'>
            <img src="/images/SpinnerLogin.gif" className='w-40' alt="loading" />
        </div>
    </>
  )
}

export default Spinner