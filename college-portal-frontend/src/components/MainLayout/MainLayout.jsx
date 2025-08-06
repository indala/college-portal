import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomNavbar from '../Navbar/Navbar';
const MainLayout = () => {
  return (
    <>
      <CustomNavbar/>
      <div className="container mt-3">
        <Outlet /> 
      </div>
    </>
  );
};

export default MainLayout;
