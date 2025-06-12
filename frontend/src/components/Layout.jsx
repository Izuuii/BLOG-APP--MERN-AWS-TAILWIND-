import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const user = sessionStorage.getItem('User')
        if (!user) {
            navigate('/')
        }
    }, [navigate])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout