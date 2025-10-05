import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Send, ArrowLeft, Check } from 'lucide-react';

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
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back</span>
                        </button>
                        <h1 className="text-xl font-semibold text-white">Contact</h1>
                        <div className="w-20"></div> {/* Spacer for centering */}
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Mail size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Have questions, feedback, or just want to say hello? I'd love to hear from you!
                    </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                            maxLength={100}
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                            maxLength={100}
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-white">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={6}
                            maxLength={2000}
                            placeholder="Tell me what's on your mind..."
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-400">{message.length}/2000</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center space-x-2"
                    >
                        <Send size={20} />
                        <span>Send Message</span>
                    </button>
                </form>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-3">Other Ways to Connect</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            This is a learning project built to practice the MERN stack. Your feedback helps me improve!
                        </p>
                        <div className="flex justify-center space-x-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-2">
                                    <Mail size={16} className="text-gray-400" />
                                </div>
                                <span className="text-xs text-gray-400">Response in 24h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 flex items-center p-4 bg-green-900/90 text-green-100 rounded-xl shadow-lg backdrop-blur-sm">
                    <Check size={20} className="mr-3" />
                    <span className="font-medium">Message sent successfully!</span>
                </div>
            )}
        </div>
    );
};

export default Contact;