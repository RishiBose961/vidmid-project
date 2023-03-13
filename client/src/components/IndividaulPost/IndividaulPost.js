import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import RandomPost from './RandomPost';

const IndividaulPost = () => {

  const { token } = useContext(AuthContext)
  const { id } = useParams("");
  const [inpval, setinpval] = useState([])

  const getdata = async () => {

    const res = await fetch(`/api/auth/getsinglepost/${id}`, {
      method: 'GET',
    })
    const data = await res.json();
    // console.log(data);
    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setinpval(data);
      // console.log("get data");
    }
  }

  // console.log(inpval);
  useEffect(() => {
    setTimeout(() => {
      getdata();
      // setLoading(true);
    }, 1000)
  }, [])

  // console.log(inpval);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-span-2 flex justify-center mt-3">
          <video src={inpval?.videos} controls className='lg:h-[816px]  h-fit rounded-lg mb-4 bg-slate-300'>
          </video>
        </div>

        <div className="...">
          <div className='inline-flex mt-3'>
            <Avatar className='mt-2 ring-amber-600 bg-amber-500' alt='vimit' src={inpval.postedBy?.avatar} />
            <p className='mt-4 mx-3'>{inpval.postedBy?.username}</p>
          </div>
          <div className='mb-4 mt-4'>
            <p className='font-bold text-xl'>{inpval.title}</p>
          </div>
          <div className=''>
            <p>{inpval.description}</p>
          </div>

          <div className='mt-10'>
            <RandomPost/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividaulPost