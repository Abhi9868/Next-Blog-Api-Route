import connectDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

// Joi schema for validation
const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

export const POST = async (req) => {
    try {
        // Connect to the database
        await connectDB();

        // Parse JSON from the request body
        const { title, description } = await req.json();

        // Validate the request data
        const { error } = AddNewBlog.validate({ title, description });
        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.details[0].message,
                },
                { status: 400 }
            );
        }

        // Save the blog to the database
        const newBlog = await Blog.create({ title, description });

        // Check if the blog was created successfully
        if (!newBlog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Something went wrong, please try again",
                },
                { status: 500 }
            );
        }

        // Return the response for successful creation
        return NextResponse.json(
            {
                success: true,
                message: "Blog added successfully",
            },
            { status: 201 }
        );

    } catch (error) {
        // Log the error details for debugging
        console.error("Error in POST /api/add-blog:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong, please try again",
            },
            { status: 500 }
        );
    }
};
