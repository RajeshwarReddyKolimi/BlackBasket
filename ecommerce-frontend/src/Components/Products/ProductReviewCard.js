import React from "react";
import "../../styles/product.css";
import { AiFillStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
function ProductReviewCard({ review }) {
    const stars = new Array(4).fill(null);
    return (
        <div className="product-page-review">
            <div className="product-page-user-rating">
                {Array(review.star)
                    .fill(null)
                    .map((_, index) => (
                        <AiFillStar key={index} className="star-icon" />
                    ))}
                <span>4</span>
                <AiFillStar className="star-icon" />
            </div>
            <div className="product-page-user-name">
                <span>{review.postedby.name}</span>{" "}
                <MdVerified className="verified-icon" />
            </div>
            <div className="product-page-user-review">{review.comment}</div>
            <div className="product-page-user-review-date">{review.date}</div>
        </div>
    );
}

export default ProductReviewCard;
