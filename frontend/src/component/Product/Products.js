import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Slider from '@mui/material/Slider';
import { SlidersHorizontal, Tag, Star, Search } from 'lucide-react';

const categories = [
    "laptop",
    "tablet",
    "goli",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
];

const Products = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const { loading, error, products, resultPerPage, productsCount } = useSelector(state => state.products);
    const { keyword } = useParams();
    
    const totalPages = Math.ceil(productsCount / resultPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(getProduct(keyword || "", pageNumber));
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const ratingHandler = (event, newRating) => {
        setRatings(newRating);
    };

    useEffect(() => {
        dispatch(getProduct(keyword || "", currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings]);

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-8">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                    Prev
                </button>

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                            currentPage === number 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        {number}
                    </button>
                ))}

                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
                <Search className="w-6 h-6 text-gray-600" />
                <h2 className="text-3xl font-bold text-gray-800">
                    {keyword ? `Results for "${keyword}"` : "All Products"}
                </h2>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Filters Sidebar */}
                <div className="col-span-12 md:col-span-3 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center gap-2 mb-4">
                            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                            <h3 className="font-semibold text-gray-800">Filters</h3>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-4 h-4 text-gray-600" />
                                <h4 className="font-medium text-gray-700">Price Range</h4>
                            </div>
                            <div className="px-2">
                                <Slider
                                    value={price}
                                    max={25000}
                                    step={100}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                />
                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                    <span>₹{price[0]}</span>
                                    <span>₹{price[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-4 h-4 text-gray-600" />
                                <h4 className="font-medium text-gray-700">Categories</h4>
                            </div>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                            category === cat 
                                            ? 'bg-blue-500 text-white' 
                                            : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ratings Filter */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 text-gray-600" />
                                <h4 className="font-medium text-gray-700">Minimum Rating</h4>
                            </div>
                            <div className="px-2">
                                <Slider
                                    value={ratings}
                                    max={5}
                                    step={0.5}
                                    onChange={ratingHandler}
                                    valueLabelDisplay="auto"
                                />
                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                    <span>{ratings} stars</span>
                                    <span>5 stars</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="col-span-12 md:col-span-9">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard 
                                        key={product._id} 
                                        product={product}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-12">
                                    No products found.
                                </div>
                            )}
                        </div>
                    )}

                    {totalPages > 1 && renderPagination()}
                </div>
            </div>
        </div>
    );
};

export default Products;
