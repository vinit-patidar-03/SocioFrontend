/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Context from '../context/Context';

const OtherUserProfileCard = () => {

    const { id } = useParams();
    const { addFollower, user, followUpdate } = useContext(Context);
    const [userdetails, setUserDetails] = useState(false);
    const [userPosts, setUserPosts] = useState(false);

    useEffect(() => {
        fetchUser();
        fetchuserPosts();
    }, [followUpdate])

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
                                <button className='block ml-2 bg-gray-300 hover:bg-gray-200 transition-all hover:transition-all text-sm px-2 rounded-sm mt-2' onClick={() => { addFollower(id); }}>{userdetails.followers.includes(user._id) ? <p className='text-red-500 w-full'>Unfollow</p> : <p className='w-full'>Follow</p>}</button>
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-full sm:mr-20 sm:w-auto text-sm'>
                            <div className='mx-5 text-center p-2'>
                                <p>Followers</p>
                                <p>{userdetails.followers.length}</p>
                            </div>
                            <div className='mx-5 text-center p-2'>
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
                                <div className='cursor-pointer mt-10 mx-2 p-5 w-[293px] flex justify-center bg-orange-500 rounded-lg' key={index}>
                                    <div className='relative h-[30vh] transition-all hover:scale-110'>
                                        <img src={elem.photo.replace('http','https')} className='h-full rounded-xl shadow-lg' alt="logo" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OtherUserProfileCard