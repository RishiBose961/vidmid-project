import React from 'react'
import { Dna } from 'react-loader-spinner'

const Lhome = () => {
  return (
    <div class="flex h-screen">
      <div class="m-auto text-center">
        <p className='text-[90px] font-bold'>VidMit</p>
        <div className='flex justify-center'>
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        </div>
        
      </div>
    </div>
  )
}

export default Lhome