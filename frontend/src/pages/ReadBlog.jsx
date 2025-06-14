import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost } from '../api'

const Readblog = () => {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    let params = useParams()
    const navigate = useNavigate()
    let id = params.id

    useEffect(() => {
        async function loadPost() {
            try {
                let data = await getPost(id)
                let date = new Date(data.dateCreated)
                data.dateCreated = date.toString()
                console.log(data)
                setPost(data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
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
            
            <h2 className="text-xl mb-4">{post.description}</h2>
            
            {/* Updated image rendering using URL instead of base64 */}
            {/* Hardcoded image rendering */}
            <img
            src={post.imageUrl}
            alt="Post image"
            className="mb-4 max-w-full rounded shadow-lg"
            onError={(e) => {
                console.error('Image failed to load:', e);
                e.target.style.display = 'none';
            }}
            />
            <p className="text-gray-400 mb-2">
                {new Date(post.dateCreated).toLocaleString()}
            </p>
            <div className="text-base leading-relaxed whitespace-pre-line">{post.content}</div>
        </div>
    )
}

export default Readblog