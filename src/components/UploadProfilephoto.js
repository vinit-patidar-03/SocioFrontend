import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Avatars } from '../utils/Avatars';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Context from '../context/Context';
import Spinner from './Spinner';
const UploadProfilephoto = () => {

    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bio = searchParams.get('bio');
    const Avatar = searchParams.get('avatar');
    const webUrl = searchParams.get('website');
    const [avatar, setAvatar] = useState(parseInt(Avatar));
    const [text, setText] = useState(bio);
    const [website, setWebsite] = useState(webUrl);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { showAlert } = useContext(Context);



    const UpdateProfile = async () => {
        if (avatar || text || website) {
            setLoading(true);
            const response = await axios.put("https://sociogrambackendapi.vercel.app/sociogram/auth/editProfile", JSON.stringify({ bio: text, avatar: avatar, website: website }), {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            });

            if (avatar) {
                await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/avatarUpdate', JSON.stringify({ avatar: avatar }), {
                    headers: {
                        "Content-Type": "application/json",
                        "authToken": localStorage.getItem('token1')
                    }
                })
            }

            if (response.data.success) {
                setLoading(false);
                Navigate('/profile');
                showAlert("success", "profile updated successfully")

            }
            else {
                showAlert("danger", "some error occured");
            }
        }
        else {
            setMessage("Please fill up all the fields !!!")
        }
    }

    return (
        <>
            <div className='h-[100%] w-[100%] sm:w-[90%]  flex justify-center items-center m-auto mt-[80px] mb-[20px]'>
                {
                    <div className=' p-2 w-[95%] sm:w-[70%] text-black sm:shadow-[0_0px_3px_0px_rgba(0,0,0,0.3)] rounded-2xl createPostCard flex flex-col justify-evenly'>
                        <h1 className='p-2 text-center font-bold text-xl'>Edit Your Profile</h1>
                        <hr />
                        <div className='p-2 flex flex-col'>
                            <h1 className='py-2 text-xl font-semibold'>Choose Your Avatar</h1>
                            <div className='flex flex-wrap justify-center'>
                                {
                                    Avatars.map((elem, index) => {
                                        return (
                                            <div className={`rounded-full m-2 cursor-pointer ${avatar === index ? 'bg-slate-100 border-2 border-orange-500' : ''}`} key={index} onClick={() => { setAvatar(index); }}>
                                                <img src={elem} alt='Avatar' className='w-20' />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h1 className='py-2 text-xl font-semibold'>Add Website</h1>
                            <div className='flex text-sm'>
                                <input type="text" name="website" id="website" className='px-2 py-1 border-2 border-black text-black w-[100%]' placeholder='website url' onChange={(event) => { setWebsite(event.target.value) }} value={website} />
                            </div>
                            <h1 className='py-2  text-xl font-semibold'>Add Bio</h1>
                            <div className='flex'>
                                <textarea name="bio" id="bio" className='border-2 border-black  text-black px-2 text-sm w-[100%]' placeholder='write something about your post...' onChange={(event) => { setText(event.target.value) }} value={text}></textarea>
                            </div>
                            <div>
                                <button className='py-1 my-4 px-5 rounded-lg text-white font-bold bg-[#ff8f00] transition-all hover:bg-orange-500 hover:transition-all' onClick={UpdateProfile}>Update Profile</button>
                                <p className=' text-white'>{message}</p>
                            </div>
                        </div>
                    </div>
                }
                {loading && <Spinner />}
            </div>
        </>
    )
}

export default UploadProfilephoto;