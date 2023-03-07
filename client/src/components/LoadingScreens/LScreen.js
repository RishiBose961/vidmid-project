import { Skeleton } from '@mui/material'
import React from 'react'

const LScreen = () => {
    const load = [0, 1, 2, 3, 4, 5]
    return (
        <>
            {
                load.map((los) => (
                    <>
                        <div className='mx-2 mb-4' key={los}>
                            <div className='flex justify-start mt-2 mb-3'>
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rounded" sx={{ mx: 1 }} width={385} height={40} />
                            </div>
                            <Skeleton variant="rounded" width={"auto"} height={396} />

                            <div className='mt-2'>
                                <Skeleton variant="rectangular" width={"auto"} height={100} />
                            </div>
                        </div>
                    </>
                ))
            }
            <p className='text-lg uppercase font-semibold text-center'>loading...</p>
        </>


    )
}

export default LScreen