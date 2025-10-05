import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";
import { ArrowLeft, Upload, X, Check, AlertCircle } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

  const inputFile = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const submitObject = {
      title,
      description,
      content,
      author: null,
      dateCreated: new Date(),
    };
    if (file) {
      submitObject.file = file;
    }

    try {
      await createPost(submitObject);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/home");
      }, 1200);
    } catch (err) {
      console.error("Failed to create post:", err);
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 2000);
    }
  }

  function handleFileUpload(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    const ext = f.name.substring(f.name.lastIndexOf(".")).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      alert("Files must be jpg or png");
      if (inputFile.current) inputFile.current.value = "";
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit (15mb)");
      if (inputFile.current) inputFile.current.value = "";
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(String(ev.target?.result || ""));
    reader.readAsDataURL(f);
  }

  const removeImage = () => {
    setFile(null);
    setPreviewUrl("");
    if (inputFile.current) inputFile.current.value = "";
  };

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
            <h1 className="text-xl font-semibold text-white">Create Post</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload (Optional) */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">
              Photo (optional)
            </label>
            {!previewUrl ? (
              <button
                type="button"
                onClick={() => inputFile.current?.click()}
                className="w-full border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-colors"
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400 mb-2">Click to upload an image</p>
                <p className="text-sm text-gray-500">JPG, PNG up to 15MB</p>
              </button>
            ) : (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            )}
            <input
              ref={inputFile}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white text-lg rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              maxLength={100}
              placeholder="Write a catchy title..."
              required
              name="title"
            />
            <p className="text-xs text-gray-400">{title.length}/100</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              maxLength={200}
              placeholder="Brief description of your post..."
              required
              name="description"
            />
            <p className="text-xs text-gray-400">{description.length}/200</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 min-h-[120px]"
              maxLength={5000}
              placeholder="Share your story..."
              required
              name="content"
              rows={6}
            />
            <p className="text-xs text-gray-400">{content.length}/5000</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Share Post
            </button>
          </div>
        </form>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center p-4 bg-green-900/90 text-green-100 rounded-xl shadow-lg backdrop-blur-sm">
          <Check size={20} className="mr-3" />
          <span className="font-medium">Post shared successfully!</span>
        </div>
      )}

      {/* Error Toast */}
      {errorToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center p-4 bg-red-900/90 text-red-100 rounded-xl shadow-lg backdrop-blur-sm">
          <AlertCircle size={20} className="mr-3" />
          <span className="font-medium">Failed to share post. Try again.</span>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
