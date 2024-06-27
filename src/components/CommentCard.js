/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';

const CommentCard = (props) => {
  const { comment, postId } = props;
  const { user, setImpressionStatus } = useContext(Context);
  const [details, setDetails] = useState('');

  useEffect(() => {
    fetchCommentedUser();
  }, [])

  //FOR FETCHING USER COMMENTED ON POST
  const fetchCommentedUser = async () => {
    const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/auth/getUser/${comment.postedby}`)
    setDetails(response.data);
  }

  //FOR DELETE COMMENT
  const deleteComment = async () => {
    setImpressionStatus({ addComment: false, delComment: true })
    await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/deleteComment', JSON.stringify({ postId, commentId: comment._id }), {
      headers: {
        "Content-Type": "application/json"
      }
    })

    setImpressionStatus({ addComment: false, delComment: false })
  }
  return (
    <>
      <div className='sm:w-[500px] w-full m-auto commentCard'>
        {
          details &&
          <div className={`${comment.postedby === user._id ? 'bg-green-400' : 'bg-gray-200'} my-2 relative p-2 sm:border-2 sm:border-gray-500 sm:rounded-xl`}>
            <div className='flex items-center'>
              <img src={Avatars[details.avatar]} className='w-10' alt="logo" />
              <h3 className='font-bold ml-2'>{details.name}</h3>
            </div>
            <p className='ml-12 text-sm'>{comment.comment}</p>
            {
              (comment.postedby === user._id) &&
              <i className="fa-solid fa-trash absolute right-3 top-3 cursor-pointer text-red-600" onClick={() => {
                deleteComment()
              }
              }></i>
            }
          </div>
        }
      </div>
    </>
  )
}

export default CommentCard