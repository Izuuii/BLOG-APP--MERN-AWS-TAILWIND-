import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => { 
    return (
        <Link to={`/readblog/${post._id}`} className="block cursor-pointer">
        <div className="w-full max-w-xl mx-auto blog-card m-2 p-4 border rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-800">
            <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
            <h3 className="text-md text-gray-300 mb-1">{post.description}</h3>
            <p className="text-sm text-gray-400">{new Date(post.dateCreated).toLocaleString()}</p>
        </div>
        </Link>
    )
}

export default BlogCard
