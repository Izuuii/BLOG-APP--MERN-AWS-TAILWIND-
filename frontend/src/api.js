import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const S3_URL = import.meta.env.VITE_S3_URL;

export async function getPosts() {
  const response = await axios.get(`${BASE_API_URL}/posts`);
  if (response.status === 200) {
    // Add imageUrl to each post
    const posts = response.data.map((post) => ({
      ...post,
      imageUrl: post.imageId ? `${S3_URL}/${post.imageId}` : null,
    }));
    return posts;
  } else {
    throw new Error("Error fetching posts: " + response.statusText);
  }
}

export async function getPost(id) {
  const response = await axios.get(`${BASE_API_URL}/posts/${id}`);
  const post = response.data;

  // Use direct S3 URL construction
  post.imageUrl = `${S3_URL}/${post.imageId}`;

  return post;
}

export async function createPost(post) {
  // If an image file is provided, upload and attach imageId
  if (post.file) {
    await createImage(post.file);
    post.imageId = post.file.name;
  }

  const response = await axios.post(`${BASE_API_URL}/posts`, post);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error creating post: " + response.statusText);
  }
}

export async function updatePost(id, post) {
  const response = await axios.put(`${BASE_API_URL}/posts/${id}`, post);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error updating post: " + response.statusText);
  }
}

export async function deletePost(id) {
  const response = await axios.delete(`${BASE_API_URL}/posts/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error deleting post: " + response.statusText);
  }
}

// User functions
export async function getUser(id) {
  const response = await axios.get(`${BASE_API_URL}/users/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createUser(user) {
  const response = await axios.post(`${BASE_API_URL}/users`, user);
  return response.data;
}

export async function updateUser(id, user) {
  const response = await axios.put(`${BASE_API_URL}/users/${id}`, user);
  return response.data;
}

export async function verifyUser(user) {
  const response = await axios.post(`${BASE_API_URL}/users/login`, user);
  if (response.data.success) {
    return response.data;
  } else {
    throw new Error(response.data.message || "Error verifying user");
  }
}

// Image Upload
export async function createImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${BASE_API_URL}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function getImage(id) {
  // Deprecated if you're using direct S3 URLs
  return `${S3_URL}/${id}`;
}
