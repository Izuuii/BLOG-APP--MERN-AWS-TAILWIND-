import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api'

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        const submitObject = {
            title,
            description,
            content,
            author: null,
            dateCreated: new Date()
        }

        try {
            await createPost(submitObject)

            // Show success toast
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
                navigate('/home')
            }, 2000)
        } catch (err) {
            setErrorToast(true)
            setTimeout(() => {
                setErrorToast(false)
            }, 3000)
        }
    }

    return (
        <div className="flex justify-center py-10 relative px-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-gray-900 text-white p-6 rounded-lg border border-gray-700"
            >
                <label className="block mb-2 text-sm font-medium">Blog Post Title:</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    maxLength={100}
                    required
                    name="title"
                />

                <label className="block mb-2 text-sm font-medium">Blog Description:</label>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    maxLength={200}
                    required
                    name="description"
                />

                <label className="block mb-2 text-sm font-medium">Blog Content:</label>
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    onInput={(e) => {
                        e.target.style.height = 'auto'
                        e.target.style.height = `${e.target.scrollHeight}px`
                    }}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none overflow-hidden"
                    maxLength={5000}
                    required
                    name="content"
                    rows={4}
                />

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Create Blog
                    </button>
                </div>
            </form>

            {/* Flowbite Success Toast */}
            {showToast && (
                <div
                    className="fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert"
                >
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">Blog has been posted successfully.</div>
                </div>
            )}

            {/* Flowbite Error Toast */}
            {errorToast && (
                <div
                    className="fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert"
                >
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2h-2v-2zm0-8h2v6h-2V6z" />
                        </svg>
                        <span className="sr-only">Error icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">Failed to post the blog.</div>
                </div>
            )}
        </div>
    )
}

export default CreateBlog
