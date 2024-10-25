import connectDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

export const POST = async (req) => {
    try {
        await connectDB();
        const { title, description } = await req.json();

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

        if (!newBlog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Something went wrong, please try again",
                },
                { status: 500 }
            );
        }
        // and return the response
        return NextResponse.json(
            {
                success: true,
                message: "Blog added successfully",
            },
            { status: 201 }
        );






    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong, please try again",
            },
            { status: 500 }
        );
    }
};
