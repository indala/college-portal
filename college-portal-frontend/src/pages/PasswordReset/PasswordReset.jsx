import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Container, Spinner, InputGroup } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa';
import usePasswordReset from '../../hooks/usePasswordReset';
import useCaptcha from '../../hooks/useCaptcha';

const CaptchaInput = ({ captcha, onRefresh, value, onChange, controlId = 'captcha' }) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>Captcha</Form.Label>
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Enter Captcha"
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      <Button variant="outline-secondary" onClick={onRefresh} title="Refresh Captcha">
        <FaSyncAlt />
      </Button>
    </InputGroup>
    <div
      className="text-center mt-2 user-select-none"
      style={{
        letterSpacing: 6,
        fontWeight: 'bold',
        fontSize: '1.3rem',
        background: '#eee',
        padding: '8px',
        borderRadius: 4,
        userSelect: 'none',
      }}
    >
      {captcha}
    </div>
  </Form.Group>
);

const PasswordReset = () => {
  const {
    step,
    message,
    error,
    loading,
    sendOtp,
    verifyOtp,
    setError,
    setMessage,
    setStep,
  } = usePasswordReset();

  const [emailOrId, setEmailOrId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { captcha, generateCaptcha } = useCaptcha();
  const [captchaInput, setCaptchaInput] = useState('');

  // Reset error/message on input changes
  useEffect(() => {
    if (error) setError('');
    if (message) setMessage('');
  }, [emailOrId, otp, newPassword, confirmPassword, captchaInput]);

  // Send OTP after verifying email/id presence
  const verifyUserAndSendOtp = async () => {
    if (!emailOrId.trim()) {
      setError('Please enter your College ID or Email');
      return;
    }
    try {
      await sendOtp(emailOrId.trim());
      setStep(2);
      generateCaptcha();
      setCaptchaInput('');
    } catch {
      // error handled in hook
    }
  };

  // Verify OTP and captcha before proceeding to reset password
  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    if (captchaInput.toUpperCase() !== captcha) {
      setError('Captcha does not match');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    setStep(3);
    generateCaptcha();
    setCaptchaInput('');
  };

  // Reset password with captcha verification
  const handleResetPassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Please enter and confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (captchaInput.toUpperCase() !== captcha) {
      setError('Captcha does not match');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    verifyOtp({ emailOrIdRaw: emailOrId, otpRaw: otp, newPassword });
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ maxWidth: 400 }} className="p-4 shadow w-100">
        <h4 className="text-center mb-3">Forgot Password</h4>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {step === 1 && (
          <>
            <Form.Group className="mb-3" controlId="emailOrId">
              <Form.Label>College ID or Email</Form.Label>
              <Form.Control
                type="text"
                value={emailOrId}
                onChange={e => setEmailOrId(e.target.value)}
                placeholder="Enter your College ID or Email"
                autoComplete="username"
                disabled={loading}
              />
            </Form.Group>
            <Button
              onClick={verifyUserAndSendOtp}
              disabled={loading || !emailOrId.trim()}
              className="w-100"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Send OTP'}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Form.Group className="mb-3" controlId="otp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                autoComplete="one-time-code"
                disabled={loading}
              />
            </Form.Group>

            <CaptchaInput
              captcha={captcha}
              onRefresh={generateCaptcha}
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
              controlId="captchaInput"
            />

            <Button
              onClick={handleVerifyOtp}
              disabled={loading || !otp.trim() || !captchaInput.trim()}
              className="w-100"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Verify OTP'}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                disabled={loading}
              />
            </Form.Group>

            <CaptchaInput
              captcha={captcha}
              onRefresh={generateCaptcha}
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
              controlId="captchaReset"
            />

            <Button
              onClick={handleResetPassword}
              disabled={
                loading ||
                !newPassword.trim() ||
                !confirmPassword.trim() ||
                !captchaInput.trim()
              }
              className="w-100"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default PasswordReset;
