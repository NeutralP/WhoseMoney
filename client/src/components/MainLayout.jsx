import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '~/styles/MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="main-layout h-screen overflow-hidden min-h-0 relative flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
