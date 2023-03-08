import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import YourPost from './YourPost';

const Profile = ({ options, theme, setTheme }) => {
    const { user,dispatch } = useContext(AuthContext)


  const handleClick = async (e) => {
    e.preventDefault();
    try {
        await axios.get("/api/auth/signout")
        localStorage.removeItem("_appSignging")
        dispatch({ type: "SIGNOUT" })
    } catch (error) {
        console.log(error);
    }
}

    return (
        <>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div class="flex justify-center mt-5">
                    <img src={user.avatar}
                        alt="placeholder" className='h-64 w-64 rounded-full ring-2 ring-amber-600 bg-amber-500' />
                </div>
                <div class="col-span-2 mt-5 mx-3">
                    <div>
                        <p className='text-2xl font-bold capitalize'>{user.username}</p>
                    </div>
                    <div className='text-lg'>
                        <p>{user.email}</p>
                    </div>
                    <div className='w-96 h-20 mt-2'>
                        <p>Ezreal wasn’t anything more than an item holder/support unit during Set
                            Eight, having the traits Underground and Recon.
                            The TFT team have removed Recon as a trait for Set
                        </p>
                    </div>
                    <div className='flex space-x-3 mt-8'>
                        <p className='text-lg'>{user.followers?.length} 🔸Follower</p>
                        <p className='text-lg'>| {user.following?.length} 🔸Following</p>
                    </div>
                    <div className='inline-flex'>
                        <div className="duration-100 w-fit dark:bg-slate-800 bg-gray-100 rounded-lg mt-8">
                            {
                                options?.map(opt => (
                                    <button
                                        key={opt.text}
                                        onClick={() => setTheme(opt.text)}
                                        className={`w-8 h-8 leading-9 text-xl rounded-full m-1 
                                ${theme === opt.text && "text-sky-600"}`}>
                                        <ion-icon name={opt.icon}></ion-icon>
                                    </button>
                                ))
                            }

                        </div>
                        <Link to='/updateprofile'>
                        <div className='mt-9 mx-2'>
                            <button className='bg-gradient-to-r from-cyan-500 to-blue-500 w-32 h-10 rounded-full'>Edit</button>
                        </div>
                        </Link>      
                        <div className='mt-9 mx-2'>
                            <button className='bg-rose-500 w-32 h-10 rounded-full' onClick={handleClick}>Logout</button>
                        </div>
                    </div>

                </div>
            </div>
            <hr />
            <YourPost />
        </>


    )
}

export default Profile