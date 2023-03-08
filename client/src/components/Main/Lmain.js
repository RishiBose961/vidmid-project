import React, { useContext } from 'react'
import { HomeIcon, UserIcon, PencilIcon, UsersIcon,MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const Lmain = () => {
    const {isLoggedIn} = useContext(AuthContext)
    return (
        <div className='mx-3 mt-3'>
            <p className='mt-2 mb-2 font-bold text-lg'>For You..</p>
            <div className='inline-flex ring-2 ring-blue-500 active:bg-blue-200 w-full justify-center rounded-xl cursor-pointer mb-3'>
                <HomeIcon className="h-10 w-10 text-blue-500" /><p className='mx-2 mt-1.5 text-lg'>Home</p>
            </div>
            <Link to='/profile'>
            <div className='inline-flex ring-2 ring-purple-500 active:bg-purple-200 w-full justify-center rounded-xl cursor-pointer mb-3'>
                <UserIcon className="h-10 w-10 text-purple-500" /><p className='mx-2 mt-1.5 text-lg'>Profile</p>
            </div>
            </Link>
           {
            isLoggedIn ? <Link to='/createpost'>
                <div className='inline-flex ring-2 ring-red-500 w-full active:bg-red-200 justify-center rounded-xl cursor-pointer mb-3'>
                    <PencilIcon className="h-9 w-9 text-red-500" /><p className='mx-2 mt-1.5 text-lg'>Create Post</p>
                </div>
            </Link>:""
           }
            
            <Link to='/findfriends'>
            <div className='inline-flex ring-2 ring-amber-500 w-full active:bg-pink-200 justify-center rounded-xl cursor-pointer mb-3'>
                <MagnifyingGlassIcon className="h-9 w-9 text-amber-500" /><p className='mx-2 mt-1.5 text-lg'>Search</p>
            </div>
            </Link>
            {
            isLoggedIn ?
            <Link to='/following'>
            <div className='inline-flex ring-2 ring-pink-500 w-full active:bg-pink-200 justify-center rounded-xl cursor-pointer mb-3'>
                <UsersIcon className="h-9 w-9 text-pink-500" /><p className='mx-2 mt-1.5 text-lg'>Followings</p>
            </div>
            </Link>
            :""}
            

        </div>
    )
}

export default Lmain