// app/api/edit-blog/[id]/route.js

import connectDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

// Joi schema for validation
const EditBlogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

export const PUT = async (req) => {
    try {
        // Connect to the database
        await connectDB();

        // Get the blog ID from the URL query params
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog ID is required",
                },
                { status: 400 }
            );
        }

        // Parse JSON from the request body
        const { title, description } = await req.json();

        // Validate the request data
        const { error } = EditBlogSchema.validate({ title, description });
        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.details[0].message,
                },
                { status: 400 }
            );
        }

        // Find the blog by ID and update it
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        // Check if the blog was found and updated
        if (!updatedBlog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                { status: 404 }
            );
        }

        // Return the response for successful update
        return NextResponse.json(
            {
                success: true,
                message: "Blog updated successfully",
                blog: updatedBlog,
            },
            { status: 200 }
        );

    } catch (error) {
        // Log the error details for debugging
        console.error("Error in PUT /api/edit-blog/[id]:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong, please try again",
            },
            { status: 500 }
        );
    }
};
