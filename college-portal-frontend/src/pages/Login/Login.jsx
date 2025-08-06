import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa';
import './Login.css'; // Optional styling

const Login = () => {
  const [role, setRole] = useState('Student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');

  const navigate = useNavigate();

  // Generate new captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async () => {
    setError('');

    if (inputCaptcha.trim().toUpperCase() !== captcha) {
      setError('Captcha does not match');
      generateCaptcha();
      return;
    }

    try {
      const payload = {
        role,
        id,
        password,
        contact
      };

      const res = await axios.post('http://localhost:5000/api/login', payload);

      const token = res.data.token;
      sessionStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const userRole = decoded.role;

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
      } else {
        setError('No dashboard defined for this role');
      }

    } catch (err) {
      setError('Invalid credentials or role mismatch');
      generateCaptcha();
      console.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center form-background" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '350px',maxHeight:'600px' }} className="p-4 shadow">
        <h4 className="text-center mb-4">Login</h4>
        <Form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Student</option>
              <option>Faculty</option>
              <option>HOD</option>
              <option>Manager</option>
              <option>Admin</option>
              <option>Parent</option>
              <option>Lab-in-Charge</option>
              <option>Exam Cell</option>
              <option>Hostel Manager</option>
              <option>Transport Manager</option>
            </Form.Select>
          </Form.Group>

          {role === 'Parent' ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Student ID</Form.Label>
                <Form.Control required type="text" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Parent Contact</Form.Label>
                <Form.Control required type="number" value={contact} onChange={(e) => setContact(e.target.value)} />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">College ID</Form.Label>
                <Form.Control required type="text" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
            </>
          )}

          {/* Captcha Section */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Captcha</Form.Label>
            <div className="d-flex align-items-center">
              <div
                className="px-3 py-1 me-2 border rounded bg-light fw-bold"
                style={{ letterSpacing: '2px', fontSize: '18px' }}
              >
                {captcha}
              </div>
              <FaSyncAlt onClick={generateCaptcha} className="cursor-pointer text-primary" style={{ cursor: 'pointer' }} />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Enter Captcha</Form.Label>
            <Form.Control required type="text" value={inputCaptcha} onChange={(e) => setInputCaptcha(e.target.value)} />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="d-grid">
            <Button variant="primary" type='submit'>
              Login
            </Button>
          </div>

          <div className="text-center mt-3">
            {role === 'Student' && (
              <Button variant="link" onClick={() => window.location.href = '/password-reset'}>
                Forgot Password?
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
