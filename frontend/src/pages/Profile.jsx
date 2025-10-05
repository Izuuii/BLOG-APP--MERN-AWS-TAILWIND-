import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { getPosts } from "../api";
import * as jwt_decode from "jwt-decode";
import { Calendar, Edit, Settings, Grid, BookOpen } from "lucide-react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    async function loadUserPosts() {
      const token = sessionStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      const allPosts = await getPosts();
      const filteredPosts = allPosts.filter(
        (post) => post.author === decodedUser._id
      );
      const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setPosts(sortedPosts);
      setUser(decodedUser);
    }
    loadUserPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Profile</h1>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Settings size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">
              {user.name?.charAt(0) || "U"}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
          <p className="text-gray-400 mb-4">{user.email}</p>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>Joined {formatDate(user.joinDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen size={16} />
              <span>{posts.length} posts</span>
            </div>
          </div>

          <button className="mt-4 flex items-center space-x-2 mx-auto px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors">
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Posts Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Your Posts</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  view === "grid"
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-colors ${
                  view === "list"
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BookOpen size={20} />
              </button>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-400">
                Start sharing your thoughts with the world!
              </p>
            </div>
          ) : (
            <div
              className={`${
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "max-w-lg mx-auto space-y-0"
              }`}
            >
              {view === "grid"
                ? posts.map((post) => (
                    <div
                      key={post._id}
                      className="aspect-square bg-gray-900 rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onClick={() =>
                            (window.location.href = `/readblog/${post._id}`)
                          }
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {post.title}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                : posts.map((post) => <BlogCard key={post._id} post={post} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
