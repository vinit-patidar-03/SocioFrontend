/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Context from '../context/Context';
import FollowersModal from '../components/FollowersModal';
import IndividualPostCard from '../components/IndividualPostCard';

const OtherUserProfileCard = () => {

    const { id } = useParams();
    const Navigate = useNavigate();
    const [followUpdate, setFollowUpdate] = useState(null);
    const { addFollower, user } = useContext(Context);
    const [userdetails, setUserDetails] = useState(false);
    const [userPosts, setUserPosts] = useState(false);
    const [showFollower, setShowfollowers] = useState({ status: false, tabName: "" });

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    useEffect(() => {
        fetchUser();
        fetchuserPosts();
        userCheck();
    }, [followUpdate, userCheck, user])

    const fetchUser = async () => {
        if (user !== null) {
            const otherUser = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/auth/getUser/${id}`, { headers: { "Content-Type": "application/json" } });
            setUserDetails(otherUser.data);
            setFollowUpdate(otherUser.data.followers.filter((item) => item._id === user._id));
        }
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
                                {userdetails.bio &&
                                    <p className='ml-2 text-sm' style={{ fontFamily: 'Mukta' }}>{userdetails.bio}</p>
                                }
                                {userdetails.website &&
                                    <a href={userdetails.website} className='ml-2 text-blue-500 text-sm' target='blank'>{userdetails.website}
                                    </a>
                                }
                                <button className='block ml-2 bg-gray-300 hover:bg-gray-200 transition-all hover:transition-all text-sm px-2 rounded-sm mt-2' onClick={() => { addFollower(id) }}>
                                    {followUpdate.length !== 0 ? <p className='text-red-500 w-full'>Unfollow</p> : <p className='w-full'>Follow</p>
                                    }
                                </button>
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
                {(userPosts && userdetails) && <h2 className='text-2xl my-5 font-bold text-center'>Posts</h2>}
                <div className='flex flex-wrap justify-center'>
                    {(userPosts && userdetails) &&
                        userPosts.map((elem, index) => {
                            return (
                                <IndividualPostCard post={elem} key={index} />
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