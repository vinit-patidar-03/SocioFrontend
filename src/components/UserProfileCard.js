import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';

const UserProfileCard = (props) => {

  const Navigate = useNavigate('');
  const { post } = props;
  const {user} = useContext(Context);

  return (
    <>
      <div className='flex my-10 items-center'>
        <div className='w-20 cursor-pointer' onClick={() => { Navigate(`/profileEdit?bio=${user.bio}&website=${user.website}&avatar=${user.avatar}`) }}>
          {
            <img src={ Avatars[post.avatar]} className='rounded full' alt="logo" />
          }
        </div>
        <div>
          <h3 className='ml-2 text-lg font-bold'>{post.name}</h3>
          {post.bio && <pre className='ml-2 text-sm' style={{fontFamily: 'Roboto'}}>{post.bio}</pre>}
          {post.website && <a href={post.website} className='ml-2 text-blue-500 text-sm' target='blank'>{post.website}</a>}
        </div>
      </div>
    </>
  )
}

export default UserProfileCard