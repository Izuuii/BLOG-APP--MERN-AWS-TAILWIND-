import React, { useState } from 'react'
import CreateUser from '../components/CreateUser'
import Login from '../components/Login'

const Landing = () => {
    const [view, setView] = useState(0)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full flex flex-col items-center">
                {view === 0 ? (
                    <Login
                        noFullScreen
                        onToggle={() => setView(1)}
                    />
                ) : (
                    <CreateUser
                        noFullScreen
                        onToggle={() => setView(0)}
                    />
                )}
            </div>
        </div>
    )
}

export default Landing