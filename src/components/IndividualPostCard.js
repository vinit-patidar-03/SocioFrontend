import React, { useContext } from 'react'
import Context from '../context/Context';
import { FaRegComment, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const IndividualPostCard = (props) => {
  const { post } = props;
  const Navigate = useNavigate();
  const { setMessage, user } = useContext(Context);

  const deletePostAlert = () => {
    setMessage(post._id);
  }

  return (
    <>

      <div className='relative my-3 mx-3 md:w-[30%] sm:w-[45%] xs:w-[20%] w-[250px] h-[200px] bg-[#f8f8f8] rounded-lg shadow-[0_0px_3px_rgba(0,0,0,0.3)] sm:h-[40vh] transition-all hover:scale-[1.02]'>
        <img src={post.photo} className='w-full cursor-pointer rounded-lg h-full object-contain object-center' alt="logo" onClick={() => Navigate(`/comments/${post?._id}`)} />
        {post?.user === user?._id &&
          <FaTrashAlt className="absolute right-1 top-1 bg-gray-200 p-2 rounded-full cursor-pointer text-red-600 text-3xl" onClick={deletePostAlert} />
        }
        <div className='absolute bottom-0 right-0 p-2 bg-[#ff4015] rounded-l-lg text-white'>
          <div className='flex flex-col items-center'>
            <FaRegHeart className='text-2xl' />
            <h2>{post?.likes?.length}</h2>
          </div>
          <div className='flex flex-col items-center'>
            <FaRegComment className='text-2xl' />
            <h2>{post?.comments?.length}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndividualPostCard;