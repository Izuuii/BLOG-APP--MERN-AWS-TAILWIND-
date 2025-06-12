import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost } from '../api'

const Readblog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadPost() {
        try {
            const data = await getPost(id)
            setPost(data)
        } catch (err) {
            console.error('Failed to fetch post:', err)
            setError('Could not load post.')
        } finally {
            setLoading(false)
        }
        }

        loadPost()
    }, [id])

    if (loading) {
        return <div className="text-center py-10 text-white">Loading post...</div>
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>
    }

    return (
        <div className="max-w-screen-md mx-auto p-10 text-white">
        <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow"
        >
            ← Back
        </button>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-2">
            {new Date(post.dateCreated).toLocaleString()}
        </p>
        <h2 className="text-xl mb-4">{post.description}</h2>
        <div className="text-base leading-relaxed whitespace-pre-line">{post.content}</div>
        </div>
    )
}

export default Readblog
