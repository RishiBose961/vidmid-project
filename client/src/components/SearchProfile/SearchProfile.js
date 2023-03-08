import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const SearchProfile = () => {
    const { token, user, dispatch, isLoggedIn } = useContext(AuthContext)
    const [userProfile, setProfile] = useState(null)

    const { id } = useParams("");
    const [isFollow, setIsFollow] = useState(false);
    const [inpval, setinpval] = useState([])
    const [posts, setposts] = useState([])

    const followUser = () => {
        fetch("/api/auth/follow", {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                followId: id,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                dispatch({
                    type: "UPDATE", payload: {
                        following: data.following,
                        followers: data.followers
                    }
                });
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: data
                    }
                })
                setIsFollow(true);
            });
    };


    const unfollowUser = () => {
        fetch("/api/auth/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                unfollowId: id
            })
        }).then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setIsFollow(false);
            });
    }



    useEffect(() => {
        fetch(`/api/auth/getsingleuser/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then(res => res.json())
            .then(result => {
                setinpval(result.user);
                setposts(result.posts)
                if (
                    result.user.followers.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                    )
                ) {
                    setIsFollow(true);
                }
            })
    }, [isFollow])

    
    return (
        <div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div class="flex justify-center mt-5">
                    <img src={inpval.avatar}
                        alt="placeholder" className='h-64 w-64 rounded-full ring-2 ring-amber-600 bg-amber-500' />
                </div>
                <div class="col-span-2 mt-5 mx-3">
                    <div>
                        <p className='text-2xl font-bold capitalize'>{inpval.username}</p>
                    </div>
                    <div className='text-lg'>
                        <p>{inpval.email}</p>
                    </div>
                    <div className='w-96 h-20 mt-2'>
                        <p>Ezreal wasn’t anything more than an item holder/support unit during Set
                            Eight, having the traits Underground and Recon.
                            The TFT team have removed Recon as a trait for Set
                        </p>
                    </div>
                    <div className='flex space-x-3 mt-8'>
                        <p className='text-lg'><span>{inpval.followers?.length} 🔸 </span>Follower</p>
                        <p className='text-lg'><span>| {inpval.following?.length} 🔸 </span>Following</p>
                    </div>
                    {
                        isLoggedIn ? <div className='inline-flex'>
                            <div className='mt-9 mx-2'>
                                <button className='bg-violet-500 w-32 h-10 font-semibold rounded-full'
                                    onClick={() => {
                                        if (isFollow) {
                                            unfollowUser(user._id);
                                        } else {
                                            followUser(user._id);
                                        }
                                    }}>
                                    {isFollow ? <div className='rounded-3xl'>
                                        <p>Following</p>
                                    </div>
                                        : <div className=' rounded-3xl '>
                                            <p className='font-bold'>Follow</p>
                                        </div>}
                                </button>
                            </div>
                        </div> : ""
                    }



                </div>
            </div>
            <div className='mx-4'>
                <p className='text-lg font-semibold'>Posts</p>
                <hr />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-6 gap-3 pb-6 ml-6 mx-2 mt-4'>
                {
                    posts.map((req) => {
                        return (
                            <>
                                <Link to={`/postview/${req._id}`}>
                                    <video controls className='h-[280px] w-[159px] rounded-xl cursor-pointer ring-1 ring-zinc-900 shadow-lg  shadow-amber-400'>
                                        <source src={req.videos} alt='Something Went Wrong' />
                                    </video>
                                </Link>
                            </>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default SearchProfile