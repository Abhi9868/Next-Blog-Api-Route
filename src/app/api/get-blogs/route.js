import connectDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Retrieve all blogs from the database
        const blogs = await Blog.find(); // Use .find() to get all documents

        // Return the list of blogs
        return NextResponse.json(
            {
                success: true,
                message: "Blogs retrieved successfully",
                total: blogs.length,
                data: blogs,
            },
            { status: 200 }
        );

    } catch (error) {
        // Log the error details for debugging
        console.error("Error in GET /api/get-blogs:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong, please try again",
            },
            { status: 500 }
        );
    }
};
