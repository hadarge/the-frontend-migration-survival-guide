import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
    initialLiked?: boolean;
    likeCount?: number;
    onLikeChange?: (liked: boolean, newCount: number) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
                                                   initialLiked = false,
                                                   likeCount = 0,
                                                   onLikeChange
                                               }) => {
    const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
    const [count, setCount] = useState<number>(likeCount);

    const handleClick = (): void => {
        const newLikedState: boolean = !isLiked;
        setIsLiked(newLikedState);

        const newCount: number = newLikedState ? count + 1 : count - 1;
        setCount(newCount);

        // Call the callback function if provided
        if (onLikeChange) {
            onLikeChange(newLikedState, newCount);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
        flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 
        ${isLiked
                ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
            }
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
      `}
            aria-label={isLiked ? 'Unlike' : 'Like'}
        >
            <Heart
                size={20}
                className={`transition-all duration-200 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
            />
            <span className="font-medium">{count}</span>
        </button>
    );
};
