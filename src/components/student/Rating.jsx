import React, { useEffect, useState } from 'react';

const Rating = ({ initialRating = 0, onRate }) => {
    const [rating, setRating] = useState(initialRating);

    // Update rating when initialRating prop changes
    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    // Handle click on a star
    const handleRating = (value) => {
        setRating(value);
        if (onRate) onRate(value);
    };

    return (
        <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                const isActive = starValue <= rating;

                return (
                    <button
                        key={starValue}
                        onClick={() => handleRating(starValue)}
                        className={`text-xl sm:text-2xl cursor-pointer transition-colors focus:outline-none ${isActive ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                        aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

export default Rating;
