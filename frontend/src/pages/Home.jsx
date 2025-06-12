import React, { useEffect, useState } from 'react'
import { getPosts } from '../api'
import BlogCard from '../components/BlogCard'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function loadAllPosts() {
            try {
                const data = await getPosts()
                const sortedPosts = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
                setPosts(sortedPosts)
            } catch (err) {
                console.error("Failed to load posts:", err)
            }
        }

        loadAllPosts()
    }, [])

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            {posts.map((post) => (
                <div key={post._id} className="flex justify-center mb-6">
                    <div className="w-full max-w-2xl">
                        <BlogCard post={post} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home
