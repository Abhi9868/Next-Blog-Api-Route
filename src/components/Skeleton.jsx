"use client";

import React from "react";

const SkeletonBlogCard = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-lg bg-gray-800 w-64 h-80 animate-pulse">
            {/* Placeholder for Image */}
            <div className="relative w-full h-32 mb-2 bg-gray-700 rounded-t-lg"></div>
            {/* Placeholder for Title */}
            <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
            {/* Placeholder for Description */}
            <div className="flex-1 w-full bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-1"></div>
            {/* Placeholder for Icons */}
            <div className="flex justify-center space-x-2 mt-2">
                <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
};

export default SkeletonBlogCard;
