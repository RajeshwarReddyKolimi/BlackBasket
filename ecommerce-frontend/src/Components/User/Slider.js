import React, { useState, useRef, useEffect } from "react";
import "../../styles/slider.css";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSliders } from "../../Redux/Thunks/sliderThunks";
import { pageUrl } from "../../apiUrl";
export default function Slider() {
    const dispatch = useDispatch();
    const sliderRef = useRef(null);
    const [slidePos, setSlidePos] = useState(0);
    const sliders = useSelector((state) => state.slider.sliders);
    const sliderWidth =
        sliders && sliders.length ? `${sliders.length * 100}` : `0`;
    const loading = useSelector((state) => state.slider.loading);
    useEffect(() => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${slidePos}vw)`;

            const intervalId = setInterval(() => {
                if (slidePos > -300) {
                    setSlidePos(slidePos - 100);
                } else {
                    setSlidePos(0);
                }
            }, 4000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [slidePos]);
    useEffect(() => {
        dispatch(getSliders());
    }, []);
    function slideprev() {
        if (slidePos < 0) {
            setSlidePos(slidePos + 100);
        } else setSlidePos(-300);
    }
    function slidenext() {
        if (slidePos > -300) {
            setSlidePos(slidePos - 100);
        } else setSlidePos(0);
    }
    return (
        <>
            {" "}
            {loading ? (
                <div className="loading"></div>
            ) : (
                <div className="slider-container">
                    <div
                        className="slider"
                        ref={sliderRef}
                        style={{
                            width: `${sliderWidth}vw`,
                        }}
                    >
                        {sliders.map((slider, key) => (
                            <NavLink
                                to={`${pageUrl}${slider && slider.link}`}
                                key={key}
                                className="slider-item"
                            >
                                <div
                                    className="slider-item-inner"
                                    style={{
                                        background: slider && slider.color,
                                    }}
                                >
                                    <div className="slider-info">
                                        <div className="slider-1">
                                            {slider.first}
                                        </div>
                                        <div className="slider-2">
                                            {slider.second}
                                        </div>
                                        <div className="slider-3">
                                            {slider.third}
                                        </div>

                                        <div className="tc">t&c apply </div>
                                    </div>
                                    <img
                                        className="slider-img"
                                        src={slider.image}
                                        alt="Image"
                                    />
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <SlArrowLeft onClick={slideprev} className="slider-prev" />
                    <SlArrowRight onClick={slidenext} className="slider-next" />
                </div>
            )}
        </>
    );
}
