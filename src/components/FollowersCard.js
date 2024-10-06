import React, { useContext } from 'react'
import { Avatars } from '../utils/Avatars'
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

const FollowersCard = ({ data, setShowfollowers }) => {
    const Navigate = useNavigate();
    const { user } = useContext(Context);
    return (
        <>
            <div className='p-3 flex gap-5 items-center' onClick={() => { Navigate(data._id !== user._id ? `/otherUserProfile/${data._id}` : '/profile'); setShowfollowers({ status: false, tabName: "" }) }}>
                <img src={Avatars[data.avatar]} alt="avatar" className='w-20' />
                <div className='cursor-pointer'>
                    <h2 className='text-black font-bold'>{data.name}</h2>
                    <p className='text-gray-500 line-clamp-2'>{data.bio}</p>
                </div>

            </div>
        </>
    )
}

export default FollowersCard