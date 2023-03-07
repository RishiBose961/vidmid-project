import { Avatar } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const SearchResult = ({ userSearch }) => {


    return (
        <div>
            {
                userSearch.map((item) => {
                    return (
                        <li style={{listStyleType:'none'}}>
                            <Link to={`/${item._id}`}>
                                <div className='inline-flex mt-2 text-left'>
                                    <Avatar className='mt-2 ring-amber-600 bg-amber-500' alt="VW" src={item.avatar} />
                                    <div className='mx-2'>
                                        <p className='font-bold text-lg'>{item.username}</p>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                })
            }

        </div>
    )
}

export default SearchResult