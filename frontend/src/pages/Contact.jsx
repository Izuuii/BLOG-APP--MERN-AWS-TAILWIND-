import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        setShowToast(true);

        setName('');
        setEmail('');
        setMessage('');

        // After 3 seconds, hide toast and navigate to home page
        setTimeout(() => {
        setShowToast(false);
        navigate('/home');
        }, 3000);
    }

    return (
        <div className="flex justify-center py-10 relative px-10">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-gray-900 text-white p-6 rounded-lg border border-gray-700"
        >
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="mb-6 text-gray-400 text-sm">
            Have questions or feedback? Fill out the form below and we’ll get back to you as soon as possible.
            </p>

            <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
            </label>
            <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4 w-full p-2.5 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
            maxLength={100}
            placeholder="Your full name"
            />

            <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
            </label>
            <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full p-2.5 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
            maxLength={100}
            placeholder="your.email@example.com"
            />

            <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Message
            </label>
            <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            maxLength={2000}
            placeholder="Write your message here..."
            className="mb-4 w-full p-2.5 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500 resize-none"
            />

            <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg px-6 py-2.5 focus:ring-4 focus:ring-blue-500"
            >
            Send Message
            </button>
        </form>

        {showToast && (
            <div
            id="toast-simple"
            className="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
            role="alert"
            >
            <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
            >
                <path d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
            </svg>
            <div className="ps-4 text-sm font-normal">Message sent successfully.</div>
            </div>
        )}
        </div>
    );
};

export default Contact;
