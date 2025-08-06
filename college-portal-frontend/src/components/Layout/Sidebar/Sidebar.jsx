import React from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { List } from 'react-bootstrap-icons';
import navigationConfig from '../navigationConfig';
import { motion } from 'framer-motion';

import './Sidebar.css';

const Sidebar = ({ role, expanded, toggleSidebar }) => {
  const location = useLocation();
  const menuItems = navigationConfig[role?.toLowerCase()] || [];

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      {/* Toggle Button */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <List size={40} className="text-info" />
      </div>

      {/* Navigation Items */}
      <Nav className="flex-column">
        {menuItems.map((item, index) => {
          const isActive = (() => {
            const current = location.pathname;
            const target = item.to;

            if (/^\/dashboard\/[^/]+$/.test(target)) {
              return current === target || current === target + '/';
            }

            return current.startsWith(target);
          })();

          const Icon = item.icon;

          // Expanded Sidebar Item
          const expandedLink = (
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: '#343a40' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-100"
              key={index}
            >
              <Nav.Link
                as={Link}
                to={item.to}
                className={`nav-item-link d-flex align-items-center ${isActive ? 'active' : ''}`}
              >
                <Icon size={32} className="nav-icon me-2" />
                <span className="nav-label">{item.label}</span>
              </Nav.Link>
            </motion.div>
          );

          // Collapsed Sidebar Item with Tooltip
          const collapsedLink = (
            <OverlayTrigger
              key={index}
              placement="right"
              delay={{ show: 0, hide: 0 }}
              overlay={<Tooltip>{item.label}</Tooltip>}
            >
              <Nav.Link
                as={Link}
                to={item.to}
                className={`nav-item-link d-flex align-items-center justify-content-center ${isActive ? 'active' : ''}`}
                style={{ width: '100%' }}
              >
                <motion.div
                  whileHover={{ scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: '100%' }}
                >
                  <Icon size={32} className="nav-icon" />
                </motion.div>
              </Nav.Link>
            </OverlayTrigger>
          );

          return (
            <React.Fragment key={index}>
              {expanded ? expandedLink : collapsedLink}
            </React.Fragment>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
