import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ value = 0, onChange, className = '' }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`focus:outline-none ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= value
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;