import React, { useContext, useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from '../../context/AuthContext';


const YourPost = () => {
  const { token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getPosts = async () => {
    const res = await fetch('/api/auth/getpostid', {
      headers: {
        "Authorization": token
      }
    });
    await res.json()
      .then(result => {
        setData(result.mypost)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      getPosts()
      setLoading(true)
    }, 2000)
  }, [])

  console.log(data);

  return (
    <div>
      {
        loading ? <div className='grid grid-cols-2 lg:grid-cols-6 gap-2 ml-7 mx-2 pb-8'>
          {
            data.map((req) => {
              return (
                <>
                  {/* <Link to={`/postview/${req._id}`}> */}
                  <div className='mt-4'>
                    <div>
                      <video controls className='h-[280px] w-[159px] rounded-xl cursor-pointer ring-1 ring-zinc-900 shadow-lg  shadow-teal-400'>
                        <source src={req.videos} alt='Something Went Wrong' />
                      </video>
                    </div>
                    <div className='flex justify-center'>
                      <button className='bg-rose-500 mt-4 w-12 rounded-full'>View</button>
                    </div>
                  </div>

                  {/* <ToastContainer /> */}
                  {/* </Link> */}
                </>
              )
            })
          }

        </div> : <LinearProgress color='warning' />
      }


    </div>
  )
}

export default YourPost