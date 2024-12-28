import React from 'react'

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 ${
                        star <= rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300 fill-current'
                    }`}
                >
                    <path 
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            ))}
        </div>
    )
}

const ReviewCard = ({review}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-xl">
                        {review.name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} />
                        <span className="text-gray-500 text-sm">
                            ({review.rating}/5)
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-3">
                <p className="text-gray-700 italic">
                    "{review.comment}"
                </p>
            </div>
        </div>
    )
}

export default ReviewCard