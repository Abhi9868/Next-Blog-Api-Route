"use client"; // Make this component a client component

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/get-blogs");
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const data = await res.json();
    setBlogs(data.data);
  };

  const handleDelete = async (id) => {
    // Your delete logic here
    console.log(`Deleting blog with ID: ${id}`);
    // After deletion, fetch the updated list of blogs
    await fetchBlogs();
  };

  const handleEdit = (id) => {
    // Your edit logic here
    console.log(`Editing blog with ID: ${id}`);
    // For instance, navigate to an edit page or open a modal
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-red-500 p-4">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-auto max-w-screen-lg">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
