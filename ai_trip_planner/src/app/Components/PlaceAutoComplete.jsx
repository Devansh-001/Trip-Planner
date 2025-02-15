"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../Redux/appSlice";

const PlaceAutoComplete = ({ curData, setCurData }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { formData } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSuggestions = async (value) => {
        if (value.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    value
                )}&format=json&addressdetails=1&limit=5`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 200);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCurData({ ...curData, query: value });

        if (value.trim().length > 2 && value.includes(" ")) {
            debouncedFetchSuggestions(value);
        } else if (value.trim().length > 2) {
            debouncedFetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="w-full py-2 bg-white rounded-lg">
            <InputField
                type="text"
                placeholder="Enter a location"
                value={curData.query}
                onChange={handleInputChange}
                required
            />

            {loading ? <p className="mt-2 text-center text-gray-500">Loading...</p>
                : <>
                    {suggestions && suggestions.length > 0 && (
                        <ul className="w-full max-h-60 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-blue-100 cursor-pointer text-gray-700"
                                    onClick={() => {
                                        dispatch(setFormData({ ...formData, location: suggestion.display_name }));
                                        setCurData({ ...curData, query: suggestion.display_name });
                                        setSuggestions([]);
                                    }}
                                >
                                    {suggestion.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            }
        </div>
    );
};

export default PlaceAutoComplete;
