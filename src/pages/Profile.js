import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserProfileCard from '../components/UserProfileCard';
import IndividualPostCard from '../components/IndividualPostCard';
import Context from '../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [individualPosts, setIndividualPosts] = useState('');
    const Navigate = useNavigate();
    const { user, fetchUserDetails } = useContext(Context);

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    useEffect(() => {
        fetchIndividualPosts();
        fetchUserDetails();
        userCheck();
    }, [fetchUserDetails, userCheck])

    const fetchIndividualPosts = async (event) => {
        const response = await axios.get('https://sociogrambackendapi.vercel.app/sociogram/posts/individualPosts', {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token1')
            }
        })

        setIndividualPosts(response.data);
    }

    return (
        <>
            <div className='p-2 mt-[75px]'>
                {user &&
                    <div>
                        <UserProfileCard post={user} />
                        <h2 className='text-2xl my-5 font-bold text-center'>Posts</h2>
                    </div>
                }
                <div className='flex flex-wrap justify-center'>
                    {individualPosts.length !== 0 &&
                        individualPosts.map((elem, index) => {
                            return <IndividualPostCard post={elem} key={index} />
                        })
                    }
                </div>
                <h2 className='m-10 text-lg font-bold text-center'>{individualPosts.length === 0 ? "Owner hasn't posted anything" : ''}</h2>
            </div>
        </>
    )
}

export default Profile