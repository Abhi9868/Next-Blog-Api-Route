// components/Loading.js

import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-green-500 border-solid mb-4"></div>
                {/* <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2> */}
            </div>
        </div>
    );
};

export default Loading;
