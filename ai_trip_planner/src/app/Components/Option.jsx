import React from 'react'

const Option = ({ icon, title, desc, className, ...props }) => {
    return (
        <div className={`flex flex-col w-full sm:w-[30vw] lg:w-[20vw] 2xl:w-[14vw] border shadow-md hover:shadow-xl cursor-pointer items-center p-4 gap-2 rounded-lg ${className}`} {...props}>
            <p className='text-4xl'>{icon}</p>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p className='text-sm text-gray-500'>{desc}</p>
        </div>
    )
}

export default Option
