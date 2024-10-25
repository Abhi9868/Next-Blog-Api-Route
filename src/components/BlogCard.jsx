"use client"; // Declare this as a client component

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";

const BlogCard = ({ blog, onDelete, onEdit }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-lg bg-gray-800 w-64 h-80 transition-transform transform hover:scale-105">
            <div className="relative w-full h-32 mb-2">
                <Image
                    src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your dummy image path
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />

            </div>
            <h2 className="text-lg font-bold text-white text-center">{blog.title}</h2>
            <p className="flex-1 text-gray-300 text-center">{blog.description}</p>
            <div className="flex justify-center space-x-2 mt-2">
                <button onClick={() => onEdit(blog._id)} className="text-blue-400 hover:text-blue-600">
                    <FaEdit />
                </button>
                <button onClick={() => onDelete(blog._id)} className="text-red-400 hover:text-red-600">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
