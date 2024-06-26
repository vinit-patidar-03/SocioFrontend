import React, { useContext } from 'react'
import Context from '../context/Context';
import { FaTrashAlt } from 'react-icons/fa';

const IndividualPostCard = (props) => {
  const { post } = props;
  const { setMessage } = useContext(Context);

  const deletePostAlert = () => {
    setMessage(post._id);
  }

  return (
    <>

      <div className='relative my-3 mx-3 md:w-[30%] sm:w-[45%] w-[100%] h-[30%] bg-[#f8f8f8] rounded-lg shadow-[0_0px_3px_rgba(0,0,0,0.3)] sm:h-[40vh] transition-all hover:scale-[1.02]'>
        <img src={post.photo} className='w-full cursor-pointer rounded-lg h-full object-contain object-center' alt="logo" />
        <FaTrashAlt className="absolute right-1 top-1 bg-gray-200 p-2 rounded-full cursor-pointer text-red-600 text-xl" onClick={deletePostAlert} />
      </div>
    </>
  )
}

export default IndividualPostCard;