'use client';

import { Review } from '@/lib/types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import css from './ReviewsList.module.css';

type ReviewsListProps = {
  reviews: Review[];
};

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className={css.reviews}>
      {reviews.map((r, idx) => {
        const firstLetter = r.reviewer_name?.charAt(0).toUpperCase();

        return (
          <div key={idx} className={css.review}>
            <div className={css.header}>
              <div className={css.avatar}>{firstLetter}</div>

              <div>
                <span className={css.name}>{r.reviewer_name}</span>
                <span className={css.stars}>
                  {[...Array(5)].map((_, i) =>
                    i < r.reviewer_rating ? (
                      <AiFillStar key={i} color="#f5c518" />
                    ) : (
                      <AiOutlineStar key={i} color="#f5c518" />
                    )
                  )}
                </span>
              </div>
            </div>

            <p className={css.comment}>{r.comment}</p>
          </div>
        );
      })}
    </div>
  );
}