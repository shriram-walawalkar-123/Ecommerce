import React, { Fragment, useEffect } from 'react';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const { products} = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <Fragment>
            <MetaData title="ECOMMERCE" />

            <div className='bg-gray-200 h-screen flex flex-col justify-center items-center'>
                <p className='font-bold text-3xl mb-5'>Welcome to ECOMMERCE</p>
                <h1 className='text-gray-500 font-bold text-xl mb-5'>Find Amazing Products Below</h1>

                <a href="#products" className='flex justify-center items-center'>
                    <button className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700'>
                        Scroll
                        <i className="fas fa-user ml-2"></i>
                    </button>
                </a>
            </div>

            <h2 className='text-center text-xl font-bold my-8' id="products">Featured Products</h2>

            <div className='grid grid-cols-4 gap-4 p-4'>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Fragment>
    );
};

export default Home;
