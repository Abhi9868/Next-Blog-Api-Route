"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use `next/router` for navigation in Next.js

export default function AddBlog() {
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch("/api/add-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                setSuccessMessage(result.message);
                setFormData({ title: "", description: "" });
                setTimeout(() => {
                    router.push("/"); // Navigate to home after 2 seconds
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error("Error adding blog:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 p-4">
            <div className="w-full max-w-md p-8 space-y-6">
                <h1 className="text-2xl font-bold text-white text-center">Add New Blog</h1>

                {error && (
                    <div className="p-4 mb-4 text-sm bg-red-100 rounded-lg text-red-600" role="alert">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="p-4 mb-4 text-sm bg-green-100 rounded-lg text-green-600" role="alert">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-white">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-800 text-white"
                            rows="5"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
