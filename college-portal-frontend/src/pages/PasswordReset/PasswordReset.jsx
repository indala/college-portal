import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import axios from 'axios';

const PasswordReset = () => {
  const [step, setStep] = useState(1);
  const [emailOrId, setEmailOrId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('/api/send-otp', { emailOrId });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError('User not found or error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('/api/verify-otp', {
        emailOrId,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      if (res.data.success) {
        setTimeout(() => window.location.href = '/login', 2000);
      }
    } catch (err) {
      setError('Invalid OTP or error resetting password');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ maxWidth: '400px' }} className="p-4 shadow w-100">
        <h4 className="text-center mb-3">Forgot Password</h4>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {step === 1 ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label>College ID or Email</Form.Label>
              <Form.Control type="text" value={emailOrId} onChange={(e) => setEmailOrId(e.target.value)} />
            </Form.Group>
            <Button onClick={sendOtp}>Send OTP</Button>
          </>
        ) : (
          <>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
            <Button onClick={verifyOtp}>Reset Password</Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default PasswordReset;
