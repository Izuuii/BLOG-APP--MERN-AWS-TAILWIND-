import React from "react";
import { Link } from "react-router-dom";
import { Code, Heart, Rocket, Users, Globe, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-white">About</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">About BlogApp</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A modern social blogging platform built with the MERN stack,
            designed to connect creators and share amazing stories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Heart size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Learning Project
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Built as a personal project to master the MERN stack through
              hands-on development, combining modern UI/UX with robust backend
              functionality.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <Rocket size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Modern Stack
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Powered by MongoDB, Express.js, React, and Node.js with modern
              tools like Tailwind CSS and Lucide icons for a seamless
              experience.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Social Features
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Instagram-inspired interface with likes, comments, and image
              sharing capabilities to create an engaging social blogging
              experience.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Globe size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Cloud Storage
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Integrated with AWS S3 for reliable image storage and CDN
              delivery, ensuring fast loading times and scalable media
              management.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Technologies Used
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "MongoDB", desc: "Database" },
              { name: "Express.js", desc: "Backend API" },
              { name: "React.js", desc: "Frontend UI" },
              { name: "Node.js", desc: "Runtime" },
              { name: "AWS S3", desc: "Image Storage" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Lucide React", desc: "Icons" },
              { name: "JWT", desc: "Authentication" },
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Code size={20} className="text-gray-400" />
                </div>
                <h4 className="text-white font-medium mb-1">{tech.name}</h4>
                <p className="text-gray-400 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Connect?
          </h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            I'd love to hear your feedback, suggestions, or just chat about web
            development and technology!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
