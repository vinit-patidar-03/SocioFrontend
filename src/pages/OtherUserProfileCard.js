import React, { useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const OtherUserProfileCard = () => {

    const { id } = useParams();
    const [userdetails, setUserDetails] = useState(false);
    const [userPosts, setUserPosts] = useState(false);

    useEffect(() => {
        fetchUser();
        fetchuserPosts();
    }, [])

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
                {userdetails &&
                    <div className='flex my-10 items-center'>
                        <div className='w-20 cursor-pointer'>
                            {
                                <img src={Avatars[userdetails.avatar]} className='rounded full' alt="logo" />
                            }
                        </div>
                        <div>
                            <h3 className='ml-2 text-lg font-bold'>{userdetails.name}</h3>
                            <h5 className='ml-2'>{userdetails.bio}</h5>
                            <a href={userdetails.website} className='ml-2 text-blue-500' target='blank'>{userdetails.website}</a>
                        </div>
                    </div>
                }
                <hr className='mx-10 border-black' />
                {userPosts &&
                    userPosts.map((elem,index) => {
                        return (
                            <div className='cursor-pointer mt-10 mx-2 p-5 w-[293px] flex justify-center bg-orange-500 rounded-lg' key={index}>
                                <div className='relative h-[30vh] transition-all hover:scale-110'>
                                    <img src={elem.photo} className='h-full rounded-xl shadow-lg' alt="logo" />
                                </div>
                            </div>
                        )
                    })


                }
            </div>
        </div>
    )
}

export default OtherUserProfileCard