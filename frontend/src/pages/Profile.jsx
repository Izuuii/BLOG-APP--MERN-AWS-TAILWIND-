import React, { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import { getPosts } from '../api'
import * as jwt_decode from 'jwt-decode'

const Profile = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadUserPosts() {
            const token = sessionStorage.getItem('User')
            const decodedUser = jwt_decode.jwtDecode(token)
            const allPosts = await getPosts()
            const filteredPosts = allPosts.filter((post) => post.author === decodedUser._id)
            setPosts(filteredPosts)
            setUser(decodedUser)
        }
        loadUserPosts()
    }, [])

    const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Name:</label>
                    <div className="text-lg text-gray-900 dark:text-white">{user.name}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email:</label>
                    <div className="text-lg text-gray-900 dark:text-white">{user.email}</div>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Join Date:</label>
                    <div className="text-lg text-gray-900 dark:text-white">{formatDate(user.joinDate)}</div>
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Your Blog Posts</h3>
            {posts.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">No posts yet.</div>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="flex justify-center mb-6">
                        <div className="w-full max-w-2xl">
                            <BlogCard post={post} />
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Profile