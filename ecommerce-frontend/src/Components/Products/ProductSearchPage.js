import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import findToken from "../../findToken";
import ProductCard from "./ProductCard";
import axios from "axios";
import "../../styles/product.css";
import { getColors } from "../../Redux/Thunks/colorThunks";
import { getCategories } from "../../Redux/Thunks/categoryThunks";
import { getBrands } from "../../Redux/Thunks/brandThunks";
import { useDispatch, useSelector } from "react-redux";
import apiUrl from "../../apiUrl";
import "../../styles/search.css";
import "../../styles/forms.css";
import { BsChevronDown, BsMenuDown, BsSortDown } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
function ProductSearchPage() {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands);
    const colors = useSelector((state) => state.color.colors);
    const categories = useSelector((state) => state.category.categories);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedStar, setSelectedStar] = useState("");
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [showBrands, setShowBrands] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [searchResult, setSearchResult] = useState();
    const [query, setQuery] = useState(
        `sort=${sortBy}&brands=${selectedBrands}&minPrice=${selectedMinPrice}&maxPrice=${selectedMaxPrice}&colors=${selectedColors}&categories=${selectedCategories}&discount=${selectedDiscount}&star=${selectedStar}`
    );
    const reset = () => {
        setSelectedMaxPrice("");
        setSelectedMinPrice("");
        setSelectedColors([]);
        setSelectedBrands([]);
        setSelectedCategories([]);
        setSelectedDiscount("");
        setSelectedStar("");
        setSortBy("");
    };
    const handleCategoryChange = (e, categoryName) => {
        const selectedCategory = e.target.value;
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, selectedCategory]);
        } else {
            setSelectedCategories(
                selectedCategories.filter(
                    (category) => category !== selectedCategory
                )
            );
        }
    };
    const handleBrandChange = (e, brandName) => {
        const selectedBrand = e.target.value;
        if (e.target.checked) {
            setSelectedBrands([...selectedBrands, selectedBrand]);
        } else {
            setSelectedBrands(
                selectedBrands.filter((Brand) => Brand !== selectedBrand)
            );
        }
    };
    const handleColorChange = (e, colorName) => {
        const selectedColor = e.target.value;
        if (e.target.checked) {
            setSelectedColors([...selectedColors, selectedColor]);
        } else {
            setSelectedColors(
                selectedColors.filter((color) => color !== selectedColor)
            );
        }
    };
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getBrands());
    }, []);
    useEffect(() => {
        search();
    }, [id]);

    useEffect(() => {
        setQuery(
            `sort=${sortBy}&brands=${selectedBrands}&minPrice=${selectedMinPrice}&maxPrice=${selectedMaxPrice}&colors=${selectedColors}&categories=${selectedCategories}&discount=${selectedDiscount}&star=${selectedStar}`
        );
    }, [
        sortBy,
        selectedBrands,
        selectedColors,
        selectedCategories,
        selectedMinPrice,
        selectedMaxPrice,
        selectedStar,
        selectedDiscount,
    ]);

    function handleFilter(e) {
        e.preventDefault();
        search();
    }

    async function search() {
        try {
            const token = await findToken();
            const response = await axios.get(
                `${apiUrl}/product/search?id=${id}&${query}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setSearchResult(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    return (
        <div className="search-page">
            <div
                className={`section ${
                    showFilters
                        ? "filter-container"
                        : "filter-container-absolute"
                }`}
            >
                <div className="section-header">
                    <div className="header-title">Filters</div>
                    <button
                        onClick={() => {
                            setShowFilters((prev) => !prev);
                        }}
                        className="filters-close-button"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <form
                    onSubmit={(e) => {
                        handleFilter(e);
                    }}
                    className="filter-form"
                >
                    {brands && (
                        <button className="search-page-filter">
                            <div
                                className="search-page-filter-header"
                                onClick={() => setShowBrands((prev) => !prev)}
                            >
                                Brand <BsChevronDown />
                            </div>
                            {showBrands && (
                                <div className="search-page-filter-option ">
                                    {brands.map((brand, key) => (
                                        <label
                                            key={key}
                                            className="search-page-label"
                                        >
                                            <input
                                                type="checkbox"
                                                value={brand.name}
                                                checked={selectedBrands.includes(
                                                    brand.name
                                                )}
                                                onChange={(e) =>
                                                    handleBrandChange(
                                                        e,
                                                        brand.name
                                                    )
                                                }
                                            />
                                            {brand.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </button>
                    )}
                    {colors && (
                        <button className="search-page-filter">
                            <div
                                className="search-page-filter-header"
                                onClick={() => setShowColors((prev) => !prev)}
                            >
                                Color <BsChevronDown />
                            </div>
                            {showColors && (
                                <div className="search-page-filter-option">
                                    {colors.map((color, key) => (
                                        <label
                                            key={key}
                                            className="search-page-label"
                                        >
                                            <input
                                                type="checkbox"
                                                value={color.name}
                                                checked={selectedColors.includes(
                                                    color.name
                                                )}
                                                onChange={(e) =>
                                                    handleColorChange(
                                                        e,
                                                        color.name
                                                    )
                                                }
                                            />
                                            {color.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </button>
                    )}
                    {categories && (
                        <button className="search-page-filter">
                            <div
                                className="search-page-filter-header"
                                onClick={() =>
                                    setShowCategories((prev) => !prev)
                                }
                            >
                                Categories <BsChevronDown />
                            </div>
                            {showCategories && (
                                <div className="search-page-filter-option">
                                    {categories.map((category, key) => (
                                        <label
                                            key={key}
                                            className="search-page-label"
                                        >
                                            <input
                                                type="checkbox"
                                                value={category.name}
                                                checked={selectedCategories.includes(
                                                    category.name
                                                )}
                                                onChange={(e) =>
                                                    handleCategoryChange(
                                                        e,
                                                        category.name
                                                    )
                                                }
                                            />
                                            {category.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </button>
                    )}

                    <div className="form-item">
                        <label className="form-label">Min Price</label>
                        <input
                            type="number"
                            min={1}
                            onChange={(e) =>
                                setSelectedMinPrice(e.target.value)
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="form-item">
                        <label className="form-label">Max Price</label>
                        <input
                            type="number"
                            min={1}
                            onChange={(e) =>
                                setSelectedMaxPrice(e.target.value)
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="form-item">
                        <label className="form-label">Min Discount</label>
                        <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                                setSelectedDiscount(e.target.value)
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="form-item">
                        <label className="form-label">Rating</label>
                        <select
                            value={selectedStar}
                            onChange={(e) => setSelectedStar(e.target.value)}
                            className="form-input"
                        >
                            <option className="form-option" value={0}>
                                0 & above
                            </option>
                            <option className="form-option" value={1}>
                                1 & above
                            </option>
                            <option className="form-option" value={2}>
                                2 & above
                            </option>
                            <option className="form-option" value={3}>
                                3 & above
                            </option>
                            <option className="form-option" value={4}>
                                4 & above
                            </option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label className="form-label">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="form-input"
                        >
                            <option className="form-option" value="default">
                                Default
                            </option>
                            <option className="form-option" value="priceAsc">
                                Price: Low to High
                            </option>
                            <option className="form-option" value="priceDesc">
                                Price: High to Low
                            </option>
                            <option className="form-option" value="timeAsc">
                                Newest First
                            </option>
                            <option className="form-option" value="ratingAsc">
                                Rating: High to Low
                            </option>
                            <option className="form-option" value="ratingDesc">
                                Rating: Low to High
                            </option>
                            <option className="form-option" value="discount">
                                Discount: High to Low
                            </option>
                        </select>
                    </div>
                    <div className="button-container">
                        <button
                            type="button"
                            className="button-inverse-full"
                            onClick={(e) => {
                                reset();
                            }}
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            className="button-inverse-full"
                            onClick={(e) => {
                                setShowFilters((prev) => false);
                                handleFilter(e);
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
            <div className="filter-result-container section">
                <div className="section-header">
                    <div className="header-title">Showing results for {id}</div>
                    <button
                        className="filter-button button"
                        onClick={() => {
                            setShowFilters((prev) => false);
                        }}
                    >
                        Filter
                        <BsSortDown />
                    </button>
                </div>
                <div className="products-container">
                    {searchResult &&
                        searchResult.map((product, key) => (
                            <ProductCard key={key} item={product} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProductSearchPage;
