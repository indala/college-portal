import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { role } = decoded;

        if (role.toLowerCase() !== 'manager') {
          alert("Access denied: not a Manager");
          navigate('/');
        }

      } catch (err) {
        console.error("Invalid token", err);
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      hello
    </>
  );
};

export default ManagerDashboard;
