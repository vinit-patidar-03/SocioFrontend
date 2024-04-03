/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Context from '../context/Context';
import FollowersModal from '../components/FollowersModal';

const OtherUserProfileCard = () => {

    const { id } = useParams();
    const Navigate = useNavigate();
    const { addFollower, user, followUpdate } = useContext(Context);
    const [userdetails, setUserDetails] = useState(false);
    const [userPosts, setUserPosts] = useState(false);
    const [showFollower, setShowfollowers] = useState({ status: false, tabName: "" });

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    console.log(userdetails.followers);

    useEffect(() => {
        fetchUser();
        fetchuserPosts();
        userCheck();
    }, [followUpdate, userCheck])

    const fetchUser = async () => {
        const user = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/auth/getUser/${id}`, { headers: { "Content-Type": "application/json" } });
        setUserDetails(user.data);
    }

    const fetchuserPosts = async () => {
        const posts = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/posts/posts/${id}`, { headers: { "Content-Type": "application/json" } });
        setUserPosts(posts.data);
    }
    return (
        <div>
            <div className='p-2 mt-[75px]'>
                {(userdetails && user) &&
                    <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center'>
                        <div className='flex my-10 items-center'>
                            <div className='w-20 cursor-pointer'>
                                {
                                    <img src={Avatars[userdetails.avatar]} className='rounded full' alt="logo" loading='lazy' />
                                }
                            </div>
                            <div>
                                <h3 className='ml-2 text-lg font-bold'>{userdetails.name}</h3>
                                {userdetails.bio && <p className='ml-2 text-sm' style={{ fontFamily: 'Mukta' }}>{userdetails.bio}</p>}
                                {userdetails.website && <a href={userdetails.website} className='ml-2 text-blue-500 text-sm' target='blank'>{userdetails.website}</a>}
                                <button className='block ml-2 bg-gray-300 hover:bg-gray-200 transition-all hover:transition-all text-sm px-2 rounded-sm mt-2' onClick={() => { addFollower(id); }}>{(userdetails.followers.map((item) => { return item._id === user._id }) && userdetails.followers.length !== 0) ? <p className='text-red-500 w-full'>Unfollow</p> : <p className='w-full'>Follow</p>}</button>
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-full sm:mr-20 sm:w-auto text-sm'>
                            <div className='mx-5 text-center p-2 cursor-pointer' onClick={() => { setShowfollowers({ status: true, tabName: "Followers" }) }}>
                                <p>Followers</p>
                                <p>{userdetails.followers.length}</p>
                            </div>
                            <div className='mx-5 text-center p-2 cursor-pointer' onClick={() => { setShowfollowers({ status: true, tabName: "Followings" }) }}>
                                <p>Followings</p>
                                <p>{userdetails.followings.length}</p>
                            </div>
                        </div>

                    </div>
                }
                <hr className='mx-10 border-black' />
                <div className='flex flex-wrap justify-center'>
                    {userPosts &&
                        userPosts.map((elem, index) => {
                            return (

                                <div className='relative my-3 mx-3 md:w-[30%] sm:w-[45%] w-[100%] h-[30%] bg-[#f8f8f8] rounded-lg shadow-[0_0px_10px_rgba(0,0,0,0.3)] sm:h-[40vh] transition-all hover:scale-105'>
                                    <img src={elem.photo.replace('http', 'https')} className='w-full cursor-pointer rounded-lg h-full object-contain object-center' alt="logo" />
                                </div>
                            )
                        })
                    }
                </div>
                <h2 className='m-10 text-lg font-bold text-center'>{userPosts.length === 0 ? "Owner hasn't posted anything" : ''}</h2>
                {showFollower.status && <FollowersModal followers={userdetails.followers} followings={userdetails.followings} setShowfollowers={setShowfollowers} showFollower={showFollower} />}
            </div>
        </div>
    )
}

export default OtherUserProfileCard