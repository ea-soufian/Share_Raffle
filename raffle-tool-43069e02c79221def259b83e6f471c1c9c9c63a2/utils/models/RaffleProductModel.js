import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productTags: {
        type: [String],
        required: true
    }
});

const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
        unique: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    metafields: [{
        type: String,
        ref: 'Product'
    }]
});

const Product = mongoose.model('Product', productSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { Product, Post };