import { useState } from 'react';
import axios from 'axios';

export default function usePasswordReset() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async (emailOrIdRaw) => {
    const emailOrId = emailOrIdRaw.trim();
    if (!emailOrId) return setError('Please enter your College ID or Email');
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/send-otp', { identifier: emailOrId });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'User not found or error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async ({ emailOrIdRaw, otpRaw, newPassword }) => {
    const emailOrId = emailOrIdRaw.trim();
    const otp = otpRaw.trim();
    if (!otp) return setError('Please enter the OTP');
    if (!newPassword.trim()) return setError('Please enter a new password');
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/verify-otp', { identifier: emailOrId, otp, newPassword });
      setMessage(res.data.message);
      if (res.data.success) {
        setTimeout(() => (window.location.href = '/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP or error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    message,
    error,
    loading,
    sendOtp,
    verifyOtp,
    setError,
    setMessage,
    setStep
  };
}
