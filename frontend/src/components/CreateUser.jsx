import React, { useState } from 'react'
import { createUser } from '../api'

const CreateUser = ({ noFullScreen, onToggle }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createUser(user);
            alert("User created!");
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message;
            alert("Error creating user: " + errorMsg);
        }
    }

    return (
        <div className={`${noFullScreen ? '' : 'min-h-screen flex items-center justify-center'} bg-gray-50 dark:bg-gray-900 px-4 py-8`}>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-5"
            >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
                    Create New User
                </h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                    maxLength={40}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    maxLength={40}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    maxLength={40}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                    Create User
                </button>
                
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={onToggle}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Login existing account
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser