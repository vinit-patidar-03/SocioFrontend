/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext } from 'react'
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';
import { FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CommentCard = (props) => {
  const { comment, postId } = props;
  const { user, setImpressionStatus } = useContext(Context);

  //FOR DELETE COMMENT
  const deleteComment = async () => {
    setImpressionStatus({ addComment: false, delComment: true })
    await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/deleteComment', JSON.stringify({ postId, commentId: comment._id }), {
      headers: {
        "Content-Type": "application/json"
      }
    })
    setImpressionStatus({ addComment: false, delComment: false })
    toast.success("Comment Deleted Successfully");
  }

  return (
    <>
      <div className='sm:w-[500px] w-full m-auto commentCard'>
        {user &&
          <div className={`${comment.postedby._id === user._id ? 'bg-green-400' : 'bg-slate-100'} my-2 relative p-2 sm:border-2 sm:border-gray-500 sm:rounded-xl`}>
            <div className='flex items-center'>
              <img src={Avatars[comment?.postedby?.avatar]} className='w-10' alt="logo" />
              <h3 className='font-bold ml-2'>{comment?.postedby?.name}</h3>
            </div>
            <p className='ml-12 text-sm'>{comment.comment}</p>
            {
              (comment.postedby._id === user._id) &&
              <FaTrashAlt className="text-xl absolute right-3 top-3 cursor-pointer text-red-600" onClick={() => {
                deleteComment()
              }
              } />
            }
          </div>
        }
      </div>
    </>
  )
}

export default CommentCard