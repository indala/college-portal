import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import navigationConfig from '../navigationConfig';
import './MobileNavigation.css';

const MobileNavigation = ({ role }) => {
  const location = useLocation();

  const navItems = (navigationConfig[role?.toLowerCase()] || []).filter(item =>
    ['dashboard', 'attendance', 'marks', 'timetable'].some(key =>
      item.to.includes(key)
    )
  );

  return (
    <motion.div
      className="mobile-nav-wrapper"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Nav
        fill
        className="d-md-none bg-dark border-top shadow-sm mobile-nav-scroll"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = (() => {
            const current = location.pathname;
            const target = item.to;

            if (/^\/dashboard\/[^/]+$/.test(target)) {
              return current === target || current === target + '/';
            }

            return current.startsWith(target);
          })();

          return (
            <Nav.Item key={index}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Nav.Link
                  as={Link}
                  to={item.to}
                  className={`text-center ${isActive ? 'active text-info fw-bold' : 'text-light'}`}
                  style={{ padding: '0.5rem 0' }}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={25} />
                  </motion.div>
                  <div style={{ fontSize: '0.75rem', lineHeight: '1rem' }}>
                    {item.label}
                  </div>
                </Nav.Link>
              </motion.div>
            </Nav.Item>
          );
        })}
      </Nav>
    </motion.div>
  );
};

export default MobileNavigation;
