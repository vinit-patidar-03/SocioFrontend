import React, { useContext, useEffect, useState } from 'react'
import UserProfileCard from '../components/UserProfileCard';
import IndividualPostCard from '../components/IndividualPostCard';
import Context from '../context/Context';
import axios from 'axios';

const Profile = () => {

    const [individualPosts, setIndividualPosts] = useState('');
    const { user,fetchUserDetails } = useContext(Context);

    useEffect(() => {
        fetchIndividualPosts();
        fetchUserDetails();
    }, [])

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
                    <UserProfileCard post={user} />
                }

                <div className='flex flex-wrap justify-center'>
                    {individualPosts.length !== 0 &&
                        individualPosts.map((elem, index) => {
                            return <IndividualPostCard post={elem} key={index} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Profile