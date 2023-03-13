import React, { useContext, useEffect } from 'react'
import { HeartIcon, ShareIcon } from '@heroicons/react/24/solid'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../context/AuthContext';
import LScreen from '../LoadingScreens/LScreen';
import { Comment } from 'react-loader-spinner'
import { format } from 'timeago.js'
import Comments from '../comments/Comments';


const Rmain = () => {
    const { token, user } = useContext(AuthContext)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    // const videoRef = useRef()

    // // console.log(videoRef);

    // const handlePause = () => {
    //     videoRef.current.pause()
    // }
    // const handlePlay = (id) => {
    //         videoRef.current.play()
    // }



    const getPosts = async () => {
        const res = await fetch('/api/auth/getallpost');
        await res.json()
            .then(result => {
                setData(result.posts)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            getPosts()
            setLoading(true)
        }, 1000);

    }, [])


    // console.log(data);

    //like the post
    const likePost = (id) => {
        fetch('/api/auth/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result);
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)

            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch('/api/auth/dislike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }


    const formatter = new Intl.NumberFormat('en', {
        style: 'decimal',
        useGrouping: true,
        notation: 'compact'
    })




    return (
        <>{
            loading ? <Scrollbars style={{ width: 'auto', height: 900 }} >

                {
                    data.map((post, id) => {
                        return (
                            <div className='mt-3 group relative' key={id}>
                                <div className='flex justify-between mb-2'>
                                    <div className='inline-flex mt-2'>
                                        <Avatar className='mt-2 ring-amber-600 bg-amber-500' alt='vimit' src={post.postedBy.avatar} />
                                        <div className='mx-2'>
                                            <p className='font-bold text-lg'>{post.postedBy.username}</p>
                                            <p>{post.title}</p>
                                        </div>

                                    </div>
                                    <div className='mt-3 mx-2'>
                                   
                                    <button className='ring-2 ring-rose-500 dark:ring-lime-500 w-32 text-rose-500 dark:text-lime-500 rounded-xl'>{format(post.createdAt)}</button>
                                        
                                    </div>
                                </div>
                                <div className='flex justify-center mt-2'>


                                    <video controls className='lg:h-[816px] lg:w-[459px]  h-[696px] rounded-lg mb-4 bg-slate-300'>
                                        <source src={post.videos} className='' />
                                    </video>

                                </div>
                                <div className='group-hover:flex flex-col max-h-[94.5%] active:bg-slate-300 duration-150 cursor-pointer
                hidden absolute bottom-[136px] right-[22px] lg:right-[282px] text-white m-2 p-4 rounded-full'>
                                    <div >
                                        {formatter.format(post.likes.length)}
                                    </div>
                                </div>
                                {/* <Link to='/comments'> */}
                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden active:bg-slate-300 duration-150 cursor-pointer absolute bottom-[328px] right-[10px]  lg:right-[282px] bg-black text-white m-2 p-4 rounded-full'>
                                    <div>
                                    <Comments post={post} data={data} setData={setData}/>
                                
                                    </div>
                                </div>
                                {/* </Link> */}
                                



                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden active:bg-slate-300 duration-150 absolute bottom-64 right-[10px]  lg:right-[282px] bg-black text-white m-2 p-4 rounded-full'>
                                    <div>
                                        {post.likes.includes(user._id) ? <>
                                            <HeartIcon className='h-6 w-6 text-red-500' onClick={() => { unlikePost(post._id) }} />



                                        </> : <HeartIcon className='h-6 w-6 text-white' onClick={() => { likePost(post._id) }} />
                                        }

                                    </div>
                                </div>
                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden active:bg-slate-300 duration-150 absolute bottom-48 right-[10px]  lg:right-[282px] bg-black text-white m-2 p-4 rounded-full'>
                                    <div>
                                        <ShareIcon className='h-6 w-6 text-white' />
                                    </div>
                                </div>
                                <div className='group-hover:flex flex-col max-h-[94.5%] hidden  absolute lg:inset-x-[279px] bottom-20  lg:right-[282px] bg-black text-white m-2 p-4 rounded-full'>
                                    <div>
                                        <p>{post.description.slice(0, 37)}<Link to={`post/${post._id}`} className='text-red-400'> Read More...</Link> </p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )

                    })
                }
            </Scrollbars> : <LScreen />
        }

        </>



    )
}

export default Rmain