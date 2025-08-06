import React, { useEffect, useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css'

const Header = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const { college_id, role } = decoded;

      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/${role.toLowerCase()}/${college_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (err) {
          console.error('Error fetching user:', err);
          navigate('/');
        }
      };

      fetchUser();
    } catch (err) {
      console.error('Invalid token:', err);
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/password-reset');
  };

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    alert('Only JPEG and PNG images are allowed.');
    e.target.value = ''; // Clear file input
    return;
  }
  const formData = new FormData();
  formData.append('profile', file);

  try {
    const token = sessionStorage.getItem('token');
    const decoded = jwtDecode(token);
    const { role } = decoded;

    const res = await axios.put(
      `http://localhost:5000/api/${role.toLowerCase()}/profile-picture`, // ✅ fixed URL
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Update the user state with new profile URL
    setUser((prev) => ({ ...prev, profile_url: res.data.profile_url }));
  } catch (err) {
    console.error('Upload failed', err);
    alert('Failed to upload profile picture');
  }
};


  const displayName =
    user?.student_name ||
    user?.faculty_name ||
    user?.admin_name ||
    user?.hod_name ||
    user?.parent_name ||
    user?.manager_name ||
    user?.hostel_manager_name ||
    'User';

  const profileImage = user?.profile_url
  ? `http://localhost:5000${user.profile_url}?t=${Date.now()}`
  : 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  return (
    <div className="d-flex justify-content-between align-items-center w-100 ">
      <h4 className="display-6 fw-bold">Welcome, {displayName}</h4>

      <Dropdown align="end">
        <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
          <label htmlFor="profileUpload" style={{ marginBottom: 0, cursor: 'pointer' }}>
            <Image
              src={profileImage}
              roundedCircle
              width={40}
              height={40}
              className="me-2"
              alt="profile"
              title="Click to upload"
            />
          </label>
          <input
            id="profileUpload"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <span className="fw-semibold">{displayName}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='fw-bold  '>
          <Dropdown.Header>ID: {user?.college_id}</Dropdown.Header>
          {user?.email && <Dropdown.ItemText>Email: {user.email}</Dropdown.ItemText>}
          {user?.contact_no && <Dropdown.ItemText>Contact: {user.contact_no}</Dropdown.ItemText>}
          <Dropdown.Divider />
          {!user?.parent_name && (
            <Dropdown.Item onClick={handleChangePassword}>Change Password</Dropdown.Item>
          )}
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Header;
