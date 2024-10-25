// app/api/delete-blog/[id]/route.js

import connectDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
        // Connect to the database
        await connectDB();

        // Get the blog ID from the URL query params (destructuring)
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


        // Find the blog by ID and delete it
        const deletedBlog = await Blog.findByIdAndDelete(id);

        // Check if the blog was found and deleted
        if (!deletedBlog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                { status: 404 }
            );
        }

        // Return the response for successful deletion
        return NextResponse.json(
            {
                success: true,
                message: "Blog deleted successfully",
            },
            { status: 200 }
        );

    } catch (error) {
        // Log the error details for debugging
        console.error("Error in DELETE /api/delete-blog/[id]:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong, please try again",
            },
            { status: 500 }
        );
    }
};
