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

function ProductSearchPage() {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands);
    const colors = useSelector((state) => state.color.colors);
    const categories = useSelector((state) => state.category.categories);

    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedStar, setSelectedStar] = useState("");
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [searchResult, setSearchResult] = useState();
    const [query, setQuery] = useState(
        `sort=${sortBy}&brands=${selectedBrands}&minPrice=${selectedMinPrice}&maxPrice=${selectedMaxPrice}&colors=${selectedColors}&categories=${selectedCategories}&discount=${selectedDiscount}&star=${selectedStar}`
    );

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
        <div>
            <div className="filter-container">
                <form onSubmit={(e) => handleFilter(e)}>
                    {brands && (
                        <div>
                            <label>Brand:</label>
                            {brands.map((brand, key) => (
                                <label key={key}>
                                    <input
                                        type="checkbox"
                                        value={brand.name}
                                        checked={selectedBrands.includes(
                                            brand.name
                                        )}
                                        onChange={(e) =>
                                            handleBrandChange(e, brand.name)
                                        }
                                    />
                                    {brand.name}
                                </label>
                            ))}
                        </div>
                    )}
                    {colors && (
                        <div>
                            <label>Color:</label>
                            {colors.map((color, key) => (
                                <label key={key}>
                                    <input
                                        type="checkbox"
                                        value={color.name}
                                        checked={selectedColors.includes(
                                            color.name
                                        )}
                                        onChange={(e) =>
                                            handleColorChange(e, color.name)
                                        }
                                    />
                                    {color.name}
                                </label>
                            ))}
                        </div>
                    )}
                    {categories && (
                        <div>
                            <label>Categories:</label>
                            {categories.map((category, key) => (
                                <label key={key}>
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

                    <div>
                        <label>Min Price</label>
                        <input
                            type="number"
                            min={1}
                            onChange={(e) =>
                                setSelectedMinPrice(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label>Max Price</label>
                        <input
                            type="number"
                            min={1}
                            onChange={(e) =>
                                setSelectedMaxPrice(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label>Min Discount</label>
                        <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                                setSelectedDiscount(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label>Rating</label>
                        <select
                            value={selectedStar}
                            onChange={(e) => setSelectedStar(e.target.value)}
                        >
                            <option value={0}>0 & above</option>
                            <option value={1}>1 & above</option>
                            <option value={2}>2 & above</option>
                            <option value={3}>3 & above</option>
                            <option value={4}>4 & above</option>
                        </select>
                    </div>

                    <div>
                        <label>Sort By:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">
                                Price: High to Low
                            </option>
                            <option value="timeAsc">Newest First</option>
                            <option value="ratingAsc">
                                Rating: High to Low
                            </option>
                            <option value="ratingDesc">
                                Rating: Low to High
                            </option>
                            <option value="discount">
                                Discount: High to Low
                            </option>
                        </select>
                    </div>

                    <button type="button" onClick={(e) => handleFilter(e)}>
                        Apply Filters
                    </button>
                </form>
            </div>
            <div>Showing results for {id}</div>
            <div className="products-container">
                {searchResult &&
                    searchResult.map((product, key) => (
                        <ProductCard key={key} item={product} />
                    ))}
            </div>
        </div>
    );
}

export default ProductSearchPage;
