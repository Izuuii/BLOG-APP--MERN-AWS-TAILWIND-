import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Plus,
  User,
  Info,
  Mail,
  LogOut,
  Menu,
  X,
  Search,
  Heart,
  MessageCircle,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("User");
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Create", path: "/createblog", icon: Plus },
    { name: "Profile", path: "/profile", icon: User },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-black border-r border-gray-800 z-50 transition-all duration-300 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-semibold text-lg">BlogApp</span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-white text-black"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                  onClick={() =>
                    window.innerWidth < 1024 && setIsCollapsed(true)
                  }
                >
                  <IconComponent size={24} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={24} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-4 left-4 z-30 p-2 bg-black/80 backdrop-blur-sm rounded-lg lg:hidden"
      >
        <Menu size={24} className="text-white" />
      </button>
    </>
  );
};

export default Sidebar;
