import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { role } = decoded;

        if (role.toLowerCase() !== 'faculty') {
          alert("Access denied: not a faculty");
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

export default FacultyDashboard;
