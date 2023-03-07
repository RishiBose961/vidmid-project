import React from 'react'
import Lmain from '../Main/Lmain'
import Rmain from '../Main/Rmain'

const Home = () => {
    return (
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="col-span-2"><Rmain/></div>
            <div class="..."><Lmain/></div>
        </div>
    )
}

export default Home