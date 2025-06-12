import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PageData } from './PageData'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('User')
        // Optionally remove axios header if you set it globally
        // delete axios.defaults.headers.common['Authorization']
        navigate('/')
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative mb-2">
                
                {/* Placeholder div for potential logo or to balance layout */}
                <div className="w-10 h-10 md:hidden" />

                {/* Centered nav links (desktop) */}
                <div className="hidden md:flex mx-auto space-x-8">
                    {PageData.map((page) => (
                        <NavLink
                            key={page.path}
                            to={page.path}
                            className={({ isActive }) =>
                                `block py-2 px-3 rounded-sm
                                ${isActive
                                    ? 'text-blue-700 font-semibold dark:text-blue-400'
                                    : 'text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400'}`
                            }
                        >
                            {page.name}
                        </NavLink>
                    ))}
                </div>

                {/* Logout button (right side, desktop only) */}
                <div className="hidden md:block">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Burger icon (right side on mobile) */}
                <button
                    type="button"
                    className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown nav */}
            {menuOpen && (
                <div className="md:hidden px-4">
                    <ul className="flex flex-col space-y-2 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 p-4">
                        {PageData.map((page) => (
                            <li key={page.path}>
                                <NavLink
                                    to={page.path}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded-sm
                                        ${isActive
                                            ? 'text-blue-700 bg-gray-200 dark:bg-gray-700 dark:text-blue-400'
                                            : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'}`
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {page.name}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => {
                                    setMenuOpen(false)
                                    handleLogout()
                                }}
                                className="w-full text-left py-2 px-3 rounded-sm bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-200"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar