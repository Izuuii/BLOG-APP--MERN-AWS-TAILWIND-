import React, { useState } from "react";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";

const Landing = () => {
  const [view, setView] = useState(0);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side - App branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-12">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                B
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">BlogApp</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Share your stories, connect with creators, and discover amazing
              content from around the world.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-white/10 rounded-lg backdrop-blur-sm"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <h1 className="text-3xl font-bold text-white">BlogApp</h1>
          </div>

          {view === 0 ? (
            <Login noFullScreen onToggle={() => setView(1)} />
          ) : (
            <CreateUser noFullScreen onToggle={() => setView(0)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
