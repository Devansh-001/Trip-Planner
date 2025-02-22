import React from 'react';

const InfoTag = ({ value, label, icon, condition }) => {
    return (
        <h2 className='text-xs sm:text-lg text-gray-600 bg-gray-200 rounded-xl px-2 p-1 w-fit font-medium hover:scale-105 transition-all duration-500'>
            {icon && icon} {value} {label && (condition ? label.singular : label.plural)}
        </h2>
    );
};

export default InfoTag