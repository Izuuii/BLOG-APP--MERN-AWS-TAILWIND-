import React from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import Readblog from './pages/Readblog'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import Layout from './components/Layout'
import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('User')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/readblog/:id" element={<Readblog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App