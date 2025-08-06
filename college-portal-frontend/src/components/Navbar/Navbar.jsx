import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from "../../assets/logo.png";
import './Navbar.css';

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false); // state to control expansion

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Library', path: '/library' },
    { label: 'Login', path: '/login', icon: <i className="bi bi-person-circle me-1"></i> },
  ];

  const handleNavClick = () => {
    setExpanded(false); // Collapse navbar after click
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        sticky="top"
        className="py-2 shadow-sm"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="brand-text d-none d-md-inline">
              Chaitanya Engineering College
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />

          <Navbar.Collapse id="navbar-nav">
            <div className="ms-auto text-uppercase fw-semibold nav-links text-center text-md-start d-flex flex-column flex-md-row gap-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `nav-link px-2 ${isActive ? 'active-nav-link' : ''}`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default CustomNavbar;