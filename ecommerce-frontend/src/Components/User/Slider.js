import React, { useState, useRef, useEffect } from "react";
import "../../styles/slider.css";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
export default function Slider() {
    const sliderRef = useRef(null);
    const [slidePos, setSlidePos] = useState(0);
    const [list, setList] = useState([]);
    // useEffect(() => {
    //     sliderRef.current.style.transform = `translateX(${slidePos}vw)`;
    //     const intervalId = setInterval(() => {
    //         if (slidePos > -500) {
    //             setSlidePos(slidePos - 100);
    //         } else {
    //             setSlidePos(0);
    //         }
    //     }, 5000);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [slidePos]);
    useEffect(() => {
        setList([1, 2, 3, 4, 5]);
    }, []);
    function slideprev() {
        if (slidePos < 0) {
            setSlidePos(slidePos + 100);
        } else setSlidePos(-500);
    }
    function slidenext() {
        if (slidePos > -500) {
            setSlidePos(slidePos - 100);
        } else setSlidePos(0);
    }
    return (
        <div className="slider-container">
            <div className="slider" ref={sliderRef}>
                {list.map((li, key) => (
                    <Link to="" key={key} className="slider-item">
                        <div className="slider-item-inner">
                            <div className="slider-info">
                                <div className="slider-1">UPTO 80% OFF</div>
                                <div className="slider-2">Smart Phones</div>
                                <div className="slider-3">
                                    Apple | Samsung | Realme
                                </div>
                                <div className="tc">t&c apply</div>
                            </div>
                            <img
                                className="slider-img"
                                src={`https://res.cloudinary.com/dxihuk20v/image/upload/v1699353319/cemnns2ez38lf7aoztsp.png`}
                                alt="Image"
                            />
                        </div>
                    </Link>
                ))}
            </div>
            <SlArrowLeft onClick={slideprev} className="slider-prev" />
            <SlArrowRight onClick={slidenext} className="slider-next" />
        </div>
    );
}
