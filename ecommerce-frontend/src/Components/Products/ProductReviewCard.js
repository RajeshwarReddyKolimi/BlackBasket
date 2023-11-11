import React from "react";
import "../../styles/product.css";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
function ProductReviewCard({ review }) {
    const stars = new Array(4).fill(null);
    let date = "";
    if (review && review.date) date = new Date(review.date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
        <div className="product-page-review">
            <div className="product-page-user-name">
                <span>{review.postedby.userName}</span>{" "}
                <MdVerified className="verified-icon" />
            </div>
            <div className="product-page-user-review-date">{formattedDate}</div>
            <div className="product-page-user-rating">
                {Array(review.star)
                    .fill(null)
                    .map((_, index) => (
                        <AiFillStar key={index} className="star-icon" />
                    ))}
            </div>
            <div className="product-page-user-review">{review.comment}</div>
        </div>
    );
}

export default ProductReviewCard;
