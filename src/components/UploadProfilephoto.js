import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Avatars } from '../utils/Avatars';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
const UploadProfilephoto = () => {

    const Navigate = useNavigate();
    const [avatar, setAvatar] = useState('');
    const [text, setText] = useState('');
    const [website, setWebsite] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { showAlert, setUpdate } = useContext(Context);

    const UpdateProfile = async () => {
        if (avatar && text && website) {
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
                setUpdate(true);
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
            <div className='h-[100%] w-[90%]  flex justify-center items-center m-auto mt-[80px] mb-[20px]'>
                {
                    loading ?
                        <img src="/images/spinner.gif" alt="loader" />
                        :
                        <div className=' p-2 w-[70%] m-auto bg-[#ff5200] text-white rounded-2xl createPostCard flex flex-col justify-evenly'>
                            <h1 className='p-2 text-center font-bold text-xl'>Edit Your Profile</h1>
                            <hr />
                            <div className='p-2 flex flex-col'>
                                <h1 className='py-2 text-xl'>Choose Your Avatar</h1>
                                <div className='flex flex-wrap'>
                                    {
                                        Avatars.map((elem, index) => {
                                            return (
                                                <div className={`rounded-full m-2 cursor-pointer ${avatar === index ? 'bg-white' : ''}`} key={index} onClick={() => { setAvatar(index); }}>
                                                    <img src={elem} alt='Avatar' className='w-20' />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <h1 className='py-2 text-xl'>Add Website</h1>
                                <div className='flex text-sm'>
                                    <input type="text" name="website" id="website" className='px-2 py-1 text-black w-[40%]' placeholder='website url' onChange={(event) => { setWebsite(event.target.value) }} value={website} />
                                </div>
                                <h1 className='py-2  text-xl'>Add Bio</h1>
                                <div className='flex'>
                                    <textarea name="description" id="description" className='border-2  text-black px-2 text-sm w-[40%]' placeholder='write something about your post...' onChange={(event) => { setText(event.target.value) }}></textarea>
                                </div>
                                <div>
                                    <button className='py-1 my-4 px-5 rounded-full bg-[#ff8f00] transition-all border-4 border-white hover:bg-orange-500 hover:transition-all' onClick={UpdateProfile}>Update Profile</button>
                                    <p className=' text-white'>{message}</p>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default UploadProfilephoto;