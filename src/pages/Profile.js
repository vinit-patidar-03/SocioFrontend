import React, { useContext, useEffect, useState } from 'react'
import UserProfileCard from '../components/UserProfileCard';
import IndividualPostCard from '../components/IndividualPostCard';
import Context from '../context/Context';
import axios from 'axios';

const Profile = () => {

    const [individualPosts, setIndividualPosts] = useState('');
    const {user} = useContext(Context);

    useEffect(() => {
        fetchIndividualPosts();
    }, [])

    const fetchIndividualPosts = async (event) => {
        const response = await axios.get('https://sociogrambackendapi.vercel.app/instagram/posts/individualPosts', {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token1')
            }
        })

        setIndividualPosts(response.data);
    }

    return (
        <>
            <div className='p-3 mt-[75px]'>
                { user &&
                    <UserProfileCard post={user} />
                }
                <hr />
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