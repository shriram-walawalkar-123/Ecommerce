import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate("/products");
        }
    }

    return (
        <Fragment>
            <form onSubmit={searchSubmitHandler} className="flex items-center space-x-2">
                <input
                    type='text'
                    placeholder='Search a Product ...'
                    onChange={(e) => setKeyword(e.target.value)}
                    className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    type='submit' 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Search
                </button>
            </form>
        </Fragment>
    )
}

export default Search