import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import useCaptcha from '../../hooks/useCaptcha';
import useLogin from '../../hooks/useLogin';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('Student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');

  const { captcha, generateCaptcha } = useCaptcha();
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await login({
    role,
    id,
    password,
    contact,
    captcha,
    inputCaptcha,
    regenerateCaptcha: generateCaptcha
  });

  if (response?.success) {
    toast.success('✅ Login successful!');
  } else {
    const msg = response?.message?.toLowerCase();

    if (msg?.includes('captcha')) {
      toast.error('❌ Captcha did not match. Please try again.');
    } else if (msg?.includes('credentials')) {
      toast.error('🔒 Invalid ID or Password.');
    } else if (msg?.includes('contact')) {
      toast.error('📱 Invalid Parent Contact.');
    } else {
      toast.error(response?.message || 'Login failed');
    }
  } 
};


  return (
    <Container fluid className="d-flex align-items-center justify-content-center form-background" style={{ minHeight: '100vh' }}>
     <Toaster
  position="top-center"
  toastOptions={{
    style: {
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '0.375rem', /* same as Bootstrap rounded */
      padding: '0.75rem 1.25rem',
    },
    success: {
      style: {
        backgroundColor: '#d1e7dd', // Bootstrap's bg-success-subtle
        color: '#0f5132', // Bootstrap's text-success-emphasis
        border: '1px solid #badbcc',
      },
    },
    error: {
      style: {
        backgroundColor: '#f8d7da', // Bootstrap's bg-danger-subtle
        color: '#842029', // Bootstrap's text-danger-emphasis
        border: '1px solid #f5c2c7',
      },
    },
  }}
/>

      <Card style={{ width: '100%', maxWidth: '350px', maxHeight: '600px' }} className="p-4 shadow">
        <h4 className="text-center mb-4">Login</h4>
        <Form onSubmit={handleSubmit}>
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
              <div className="px-3 py-1 me-2 border rounded bg-light fw-bold" style={{ letterSpacing: '2px', fontSize: '18px' }}>
                {captcha}
              </div>
              <FaSyncAlt onClick={generateCaptcha} className="cursor-pointer text-primary" style={{ cursor: 'pointer' }} />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Enter Captcha</Form.Label>
            <Form.Control required type="text" value={inputCaptcha} onChange={(e) => setInputCaptcha(e.target.value)} />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
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
