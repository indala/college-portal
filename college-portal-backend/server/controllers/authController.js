import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import { getUserById,getParentByStudentId } from '../models/authModel.js';


const login=async (req,res)=>{
  const { role,id,password,contact }=req.body;
  try{
    if (role === 'Parent') {
      const parent = await getParentByStudentId(id);
      if (!parent) return res.status(404).json({ message: 'Parent record not found' });

      if (parent.contact_no !== contact) {
        return res.status(401).json({ message: 'Invalid contact number' });
      }
      const token = generateToken(parent.student_id, 'Parent');
      return res.json({ message: 'Parent login successful', token });
    }
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const roleMap = {
      Student: 1,
      Faculty: 2,
      HOD: 3,
      Manager: 4,
      Admin: 5,
      Parent: 6,
      'Lab-in-Charge': 7,
      'Exam Cell': 8,
      'Hostel Manager': 9,
      'Transport Manager': 10
   };


    const expectedRoleId = roleMap[role];
    if (user.role_id !== expectedRoleId) {
      return res.status(403).json({ message: 'Role mismatch for this ID' });
    }


    const token = generateToken(user.college_id, role);
    return res.json({ message: `${role} login successful`, token });


    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default login;





