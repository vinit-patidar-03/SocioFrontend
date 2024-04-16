import React, { useContext } from 'react'
import Context from '../context/Context';

const IndividualPostCard = (props) => {
  const { post } = props;
  const { setMessage } = useContext(Context);

  const deletePostAlert = () => {
    setMessage(post._id);
  }

  return (
    <>

      <div className='relative my-3 mx-3 md:w-[30%] sm:w-[45%] w-[100%] h-[30%] bg-[#f8f8f8] rounded-lg shadow-[0_0px_10px_rgba(0,0,0,0.3)] sm:h-[40vh] transition-all hover:scale-105'>
        <img src={post.photo} className='w-full cursor-pointer rounded-lg h-full object-contain object-center' alt="logo" />
        <i className="fa-solid fa-trash absolute right-1 top-1 bg-gray-200 p-2 rounded-full cursor-pointer text-red-600" onClick={deletePostAlert}></i>
      </div>
    </>
  )
}

export default IndividualPostCard;