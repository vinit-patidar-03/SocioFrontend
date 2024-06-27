import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';
import FollowersModal from './FollowersModal';

const UserProfileCard = (props) => {

  const Navigate = useNavigate('');
  const { post } = props;
  const { user } = useContext(Context);
  const [showFollower, setShowfollowers] = useState({ status: false, tabName: "" });

  return (
    <>
      <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex my-10 items-center'>
          <div className='w-20 cursor-pointer bg-slate-100 border-2 border-orange-500 rounded-full' onClick={() => { Navigate(`/profileEdit?bio=${user.bio === undefined ? '' : user.bio}&website=${user.website === undefined ? '' : user.website}&avatar=${user.avatar}`) }}>
            {
              <img src={Avatars[post.avatar]} className='rounded full' alt="logo" />
            }
          </div>
          <div>
            <h3 className='ml-2 text-lg font-bold'>{post.name}</h3>
            {post.bio && <p className='ml-2 text-sm' style={{ fontFamily: 'Roboto' }}>{post.bio}</p>}
            {post.website && <a href={post.website} className='ml-2 text-blue-500 text-sm' target='blank'>{post.website}</a>}
          </div>
        </div>
        <div className='flex justify-center items-center w-full sm:mr-20 sm:w-auto text-sm'>
          <div className='mx-5 text-center p-2 cursor-pointer' onClick={() => { setShowfollowers({ status: true, tabName: "Followers" }) }}>
            <p>Followers</p>
            <p>{post.followers.length}</p>
          </div>
          <div className='mx-5 text-center p-2 cursor-pointer' onClick={() => { setShowfollowers({ status: true, tabName: "Followings" }) }}>
            <p>Followings</p>
            <p>{post.followings.length}</p>
          </div>
        </div>
      </div>
      {showFollower.status && <FollowersModal followers={post.followers} followings={post.followings} setShowfollowers={setShowfollowers} showFollower={showFollower} />}
    </>
  )
}

export default UserProfileCard