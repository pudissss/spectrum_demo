"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  isEditable?: boolean;
  onRate?: (rating: number) => void;
  starCount?: number;
  size?: number;
}

export function StarRating({ rating, isEditable = false, onRate, starCount = 5, size = 18 }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = (rate: number) => {
    if (isEditable && onRate) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    if (isEditable) {
      setHoverRating(rate);
    }
  };

  const handleMouseLeave = () => {
    if (isEditable) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(starCount)].map((_, index) => {
        const starValue = index + 1;
        const displayRating = hoverRating || rating;
        
        return (
          <Star
            key={starValue}
            size={size}
            className={cn(
              "transition-colors",
              starValue <= displayRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
              isEditable && 'cursor-pointer hover:scale-110'
            )}
            onClick={() => handleRate(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}
