import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatars } from '../utils/Avatars';

const UserProfileCard = (props) => {

  const Navigate = useNavigate('');
  const { post } = props;

  return (
    <>
      <div className='flex my-10 items-center'>
        <div className='w-20 cursor-pointer' onClick={() => { Navigate('/profileEdit') }}>
          {
            <img src={ Avatars[post.avatar]} className='rounded full' alt="logo" />
          }
        </div>
        <div>
          <h3 className='ml-2 text-lg font-bold'>{post.name}</h3>
          <pre className='ml-2' style={{fontFamily: 'Mukta'}}>{post.bio}</pre>
          <a href={post.website} className='ml-2 text-blue-500' target='blank'>{post.website}</a>
        </div>
      </div>
    </>
  )
}

export default UserProfileCard