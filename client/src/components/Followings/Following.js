import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Hearts } from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';

const Following = () => {

    const { user, token } = useContext(AuthContext)
    const [friends, setFriends] = useState([]);
    const [friendsFollower, setfriendsFollower] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/api/auth/friendfollowing/" + user._id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                setTimeout(() => {
                    setFriends(friendList.data);
                    setLoading(true);
                }, 1000);

            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    useEffect(() => {
        const getFriend = async () => {
            try {
                const friendList = await axios.get("/api/auth/friendfollowers/" + user._id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                setTimeout(() => {
                    setfriendsFollower(friendList.data);
                    setLoading(true);
                }, 1000);

            } catch (err) {
                console.log(err);
            }
        };
        getFriend();
    }, [user]);


    return (
        <div>
            {
                loading ? <>
                    <div class="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-3">
                        <div>
                            <p className='text-center uppercase font-semibold text-xl'>Following</p>
                            <div className='text-center mt-5'>
                                {
                                    friends.map((following) => {
                                        return (
                                            <div className='inline-flex mt-2 ring-1 w-fit rounded-2xl ring-lime-400 dark:ring-white'>

                                                <img src={following.avatar}
                                                    alt="placeholder" className='h-14 w-14 rounded-full bg-amber-500' />
                                                <div className='mx-2'>
                                                    <p className='font-bold text-lg'>{following.username}</p>
                                                    <p>{following.email}</p>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <p className='text-center uppercase font-semibold text-xl'>followers</p>
                            <div className='text-center mt-5' >
                                {
                                    friendsFollower.map((follower) => {
                                        return (
                                            <div className='inline-flex mt-2 ring-1 w-fit rounded-2xl ring-lime-400 dark:ring-white'>

                                                <img src={follower.avatar}
                                                    alt="placeholder" className='h-14 w-14 rounded-full bg-amber-500' />
                                                <div className='mx-2'>
                                                    <p className='font-bold text-lg'>{follower.username}</p>
                                                    <p>{follower.email}</p>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </> : <div class="flex h-screen">
                    <div class="m-auto text-center">
                        <Hearts
                            height="180"
                            width="180"
                            color="red"
                            ariaLabel="hearts-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />

                    </div>
                    </div>
            }

        </div>
    )
}

export default Following