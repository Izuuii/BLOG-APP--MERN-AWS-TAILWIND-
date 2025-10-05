import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const BlogCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000) + 10); // Mock likes

  // Debug logging
  console.log("BlogCard post:", {
    title: post.title,
    imageUrl: post.imageUrl,
    imageId: post.imageId,
  });

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Mock share functionality
    console.log("Sharing post:", post.title);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Mock bookmark functionality
    console.log("Bookmarking post:", post.title);
  };

  return (
    <article className="bg-black border border-gray-800 rounded-xl overflow-hidden mb-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.author?.charAt(0) || "A"}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              {post.author || "Anonymous"}
            </p>
            <p className="text-gray-400 text-xs">
              {new Date(post.dateCreated).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="relative aspect-square">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load:", post.imageUrl);
              e.target.parentElement.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className="transition-colors">
              <Heart
                size={24}
                className={`${
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-white hover:text-gray-300"
                }`}
              />
            </button>
            <Link to={`/readblog/${post._id}`}>
              <MessageCircle
                size={24}
                className="text-white hover:text-gray-300 transition-colors"
              />
            </Link>
            <button onClick={handleShare}>
              <Share
                size={24}
                className="text-white hover:text-gray-300 transition-colors"
              />
            </button>
          </div>
          <button onClick={handleBookmark}>
            <Bookmark
              size={24}
              className="text-white hover:text-gray-300 transition-colors"
            />
          </button>
        </div>

        {/* Likes */}
        <p className="text-white font-medium text-sm mb-2">
          {likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="text-white">
          <Link
            to={`/readblog/${post._id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <h3 className="font-semibold mb-1">{post.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {post.description}
            </p>
          </Link>
        </div>

        {/* Comments link */}
        <Link
          to={`/readblog/${post._id}`}
          className="text-gray-400 text-sm mt-2 block hover:text-gray-300 transition-colors"
        >
          View all comments
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
