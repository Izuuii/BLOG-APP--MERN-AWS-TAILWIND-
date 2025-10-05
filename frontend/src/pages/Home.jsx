import React, { useEffect, useState } from "react";
import { getPosts } from "../api";
import BlogCard from "../components/BlogCard";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllPosts() {
      try {
        const data = await getPosts();
        const sortedPosts = data.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setLoading(false);
      }
    }

    loadAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-lg mx-auto pt-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">BlogApp</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <Search size={24} className="text-white" />
              </button>
              <Link
                to="/createblog"
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <Plus size={24} className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={24} className="text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No posts yet
            </h3>
            <p className="text-gray-400 mb-6">
              Be the first to share something amazing!
            </p>
            <Link
              to="/createblog"
              className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              <Plus size={20} />
              <span>Create Post</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
