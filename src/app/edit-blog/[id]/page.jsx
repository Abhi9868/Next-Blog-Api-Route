"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`/api/update-blog?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSuccessMessage(result.message);
                setTimeout(() => {
                    router.push("/"); // Navigate to home or blogs page after 2 seconds
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error("Error editing blog:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-pink-700 text-center" style={{ fontFamily: "'Dancing Script', cursive", }}>Edit Your Blog</h1>
                <p className="text-sm text-gray-400 text-center">Make changes to your blog post below:</p>

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

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                            rows="5"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </form>

            </div>
        </div>
    );
}
