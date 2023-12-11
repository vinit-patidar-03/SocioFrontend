import React, { useContext } from 'react'
import Context from '../context/Context';

const IndividualPostCard = (props) => {
  const { post } = props;
  const {setMessage} = useContext(Context);

  const deletePostAlert = () => {
        setMessage(post._id);
    }

  return (
    <>
      <div className='cursor-pointer mt-10 mx-2 p-5 w-[293px] flex justify-center bg-orange-500 rounded-lg'>
        <div className='relative h-[30vh] transition-all hover:scale-110'>
          <img src={post.photo.replace('http','https')} className='h-full rounded-xl shadow-lg' alt="logo" />
          <i className="fa-solid fa-trash absolute right-3 top-3 cursor-pointer text-red-600" onClick={deletePostAlert}></i>
        </div>
      </div>
    </>
  )
}

export default IndividualPostCard;