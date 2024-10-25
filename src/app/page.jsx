"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { useRouter } from "next/navigation";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/get-blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(`Are you sure you want to delete the blog with ID: ${id}?`);
    if (!confirmation) return;

    try {
      const res = await fetch(`/api/delete-blog?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");

      await fetchBlogs();
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-blog/${id}`);
  };

  const handleAddBlog = () => {
    router.push('/add-blog');
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex flex-col items-center">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-pink-700"
          style={{ fontFamily: "'Dancing Script', cursive", }}
        >Tech Abhi Blogs</h1>
        <button
          onClick={handleAddBlog}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add New Blog
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mx-auto max-w-screen-lg">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <BlogCard
              blog={blog}
              onDelete={() => handleDelete(blog._id)}
              onEdit={() => handleEdit(blog._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
