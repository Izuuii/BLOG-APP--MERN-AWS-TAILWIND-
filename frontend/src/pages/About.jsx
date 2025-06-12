import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">About This Project</h2>

            <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                This platform was built as a personal project to help me learn and practice the <strong>MERN stack</strong> — MongoDB, Express, React, and Node.js. Through hands-on development, I’m gaining real-world experience in full-stack web development, including building user interfaces, managing backend logic, and deploying responsive web applications.
            </p>
            </div>

            <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">🌱 My Learning Goal</h3>
            <p className="text-gray-600 dark:text-gray-300">
                My goal with this project is to strengthen my understanding of modern web development by creating a complete,
                working app that includes both frontend and backend functionality. It's a practical step in my journey toward becoming a proficient full-stack developer.
            </p>
            </div>

            <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">🛠️ Technologies Used</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>MongoDB</strong> – For storing user and content data</li>
                <li><strong>Express.js</strong> – Backend API handling</li>
                <li><strong>React.js</strong> – Frontend UI and component logic</li>
                <li><strong>Node.js</strong> – Server-side JavaScript runtime</li>
                <li><strong>Tailwind CSS</strong> – For clean and responsive styling</li>
                <li><strong>React Router</strong> – For client-side navigation</li>
            </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow mt-10">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">📬 Want to Say Hi?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
                If you have feedback, suggestions, or just want to support my learning journey, feel free to reach out!
            </p>
            <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
                Contact Me
            </Link>
            </div>
        </div>
        </div>
    );
};

export default About;
