import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });


// Check if the model already exists, then assign it
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
