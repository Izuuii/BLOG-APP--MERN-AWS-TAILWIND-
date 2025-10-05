import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../api";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const Readblog = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  let params = useParams();
  const navigate = useNavigate();
  let id = params.id;

  useEffect(() => {
    async function loadPost() {
      try {
        let data = await getPost(id);
        let date = new Date(data.dateCreated);
        data.dateCreated = date.toString();
        console.log(data);
        setPost(data);
        setLikes(Math.floor(Math.random() * 1000) + 10); // Mock likes
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
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
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <MoreHorizontal size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Author info */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {post.author?.charAt(0) || "A"}
            </span>
          </div>
          <div>
            <p className="text-white font-medium">
              {post.author || "Anonymous"}
            </p>
            <p className="text-gray-400 text-sm">
              {new Date(post.dateCreated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          {post.description}
        </p>

        {/* Image */}
        {post.imageUrl && (
          <div className="mb-6">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-xl object-cover"
              onError={(e) => {
                console.error("Image failed to load:", e);
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between py-4 border-y border-gray-800 mb-6">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2 transition-colors"
            >
              <Heart
                size={24}
                className={`${
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span className="text-gray-400">{likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <MessageCircle size={24} />
              <span>24</span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Share size={24} />
            </button>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-white leading-relaxed whitespace-pre-line text-lg">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Readblog;
