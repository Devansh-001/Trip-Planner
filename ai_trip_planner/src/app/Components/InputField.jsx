"use client"

import React, { useEffect, useState } from 'react'

const InputField = ({ type, placeholder, value, handleInputChange, className, ...props }) => {


    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  ${className}`}
            onChange={handleInputChange}
            {...props}
        />
    )
}

export default InputField
