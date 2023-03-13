import React, { useEffect, useState } from 'react'

const RandomPost = () => {
    const [inpval, setinpval] = useState([])

    const getdata = async () => {

        const res = await fetch(`/api/auth/randompost`, {
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
            {
                inpval.map((item) => {
                    return (
                        <>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex justify-center">
                                    <video src={item.videos} controls className='h-64 rounded-lg mb-4 bg-slate-300'></video>
                                </div>
                                <div class="col-span-2 ...">
                                    <div>
                                        <p className='font-semibold text-lg'>{item.title}</p>
                                    </div>
                                    <div>
                                        <p className='ring-2 w-32 text-center mt-3 mb-3 rounded-2xl ring-lime-400 text-lime-400'>{item.category}</p>
                                    </div>
                                    <div>
                                        <p className=''>{item.description.slice(0,70)}..</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }

        </div>
    )
}

export default RandomPost