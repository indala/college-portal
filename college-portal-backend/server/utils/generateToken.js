import jwt from 'jsonwebtoken';

const generateToken = (college_id, role) => {
  return jwt.sign({ college_id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};


export default generateToken;
