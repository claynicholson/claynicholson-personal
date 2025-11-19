import React from 'react'

const Tag = ({ name, color }) => {
    return (
        <div className='flex items-center space-x-2 mr-2'>
            <span
                className='w-3.5 h-3.5'
                style={{ backgroundColor: color }}
            ></span>
            <span className='text-sm font-medium'>{name}</span>
        </div>
    );
};

export default Tag