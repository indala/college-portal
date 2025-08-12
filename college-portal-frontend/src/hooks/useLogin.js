import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async ({ role, id, password, contact, captcha, inputCaptcha, regenerateCaptcha }) => {
    setError('');

    // ✅ Captcha check
    if (inputCaptcha.trim().toUpperCase() !== captcha) {
      regenerateCaptcha();
      return { success: false, message: 'Captcha does not match' };
    }

    try {
      const payload = { role, id, password, contact };
      const res = await axios.post('http://localhost:5000/api/login', payload);

      const token = res.data.token;
      sessionStorage.setItem('token', token);

      const userRole = jwtDecode(token).role;

      const dashboardRoute = {
        Student: '/dashboard/student',
        Faculty: '/dashboard/faculty',
        HOD: '/dashboard/hod',
        Manager: '/dashboard/manager',
        Admin: '/dashboard/admin',
        Parent: '/dashboard/parent',
        'Lab-in-Charge': '/dashboard/lab',
        'Exam Cell': '/dashboard/exam',
        'Hostel Manager': '/dashboard/hostel',
        'Transport Manager': '/dashboard/transport'
      }[userRole];

      if (dashboardRoute) {
        navigate(dashboardRoute);
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'No dashboard defined for this role' };
      }

    } catch (err) {
      regenerateCaptcha();
      const msg = err.response?.data?.message || 'Invalid credentials or role mismatch';
      return { success: false, message: msg };
    }
  };

  return { login, error };
};

export default useLogin;
