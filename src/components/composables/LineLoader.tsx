import React from 'react'

function LineLoader() {
    return (
        <div className="w-full h-1 bg-gray-200 relative overflow-hidden">
            <div className="absolute w-[70%] h-full bg-gradient-to-r from-primary-100 via-primary-100 to-primary-100 animate-loading-line"></div>
        </div>
    )
}

export default LineLoader
