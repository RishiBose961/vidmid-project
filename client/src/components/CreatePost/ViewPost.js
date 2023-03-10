import { Avatar } from '@mui/material'
import { format } from 'timeago.js'
import { Swiper, SwiperSlide } from "swiper/react";
import { InfinitySpin } from 'react-loader-spinner'


import "swiper/css";
import "swiper/css/pagination";


import { Pagination } from "swiper";
import { useEffect, useState } from 'react';


const ViewPost = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] =useState(false)

    const getPosts = async () => {
        const res = await fetch('/api/auth/getallimagepost');
        await res.json()
            .then(result => {
                setData(result.imagepost)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            getPosts()
            setLoading(true)
        }, 1000);

    }, [])

    // console.log(data);



    return (
        <div className='mt-4'>
            <p className='font-bold text-lg'>Least Post</p>
            {
                loading ? <div >
                    <Swiper pagination={true} loop={true} modules={[Pagination]} className="mySwiper">
                        {
                            data.map((item) => {
                                return (
                                    <SwiperSlide>
                                        <>
                                            <div className='flex justify-between'>
                                                <div className='inline-flex mt-2'>
                                                    <Avatar className='mt-2 ring-amber-600 bg-amber-500' alt='loading' src={item.postedBy.avatar} />
                                                    <div className='mx-2'>
                                                        <p className='font-bold text-lg'>{item.postedBy.username}</p>
                                                        <p>{item.title}</p>
                                                    </div>
                                                </div>
                                                <p className='mt-2'>{format(item.otp_expiry)}</p>
                                            </div>
                                            <div className='mt-2'>
                                                <img src={item.images}
                                                    alt='loading' className='h-96 w-full rounded-xl' />
                                            </div>


                                        </>
                                    </SwiperSlide>
                                )

                            })
                        }




                    </Swiper>
                </div> : <div className='flex justify-center'>
                    <InfinitySpin
                        width='200'
                        color="#4fa94d"
                    /></div>
            }

        </div>
    )
}

export default ViewPost