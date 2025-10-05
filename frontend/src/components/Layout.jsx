import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("User");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
