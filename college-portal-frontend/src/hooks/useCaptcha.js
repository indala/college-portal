import { useState, useEffect } from 'react';

const useCaptcha = () => {
  const [captcha, setCaptcha] = useState('');

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

  return { captcha, generateCaptcha };
};

export default useCaptcha;
