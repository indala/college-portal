import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import './DashboardLayout.css';
import ScrollToTopButton from "../../ScrollToTopButton/ScrollToTopButton";

const INACTIVITY_LIMIT = 2 * 60 * 1000; // 2 minutes
const WARNING_DURATION = 30; // seconds

const DashboardLayout = ({ role }) => {
  const [expanded, setExpanded] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_DURATION);
  const outletRef = useRef(null);

  const showWarningRef = useRef(false);
  const warningTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    sessionStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const startWarningCountdown = useCallback(() => {
    showWarningRef.current = true;
    setShowWarning(true);
    setCountdown(WARNING_DURATION);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    logoutTimerRef.current = setTimeout(logoutUser, WARNING_DURATION * 1000);
  }, [logoutUser]);

  const resetInactivityTimers = useCallback(() => {
    if (showWarningRef.current) return;

    clearTimeout(warningTimerRef.current);
    clearTimeout(logoutTimerRef.current);
    clearInterval(countdownIntervalRef.current);
    setCountdown(WARNING_DURATION);

    warningTimerRef.current = setTimeout(
      startWarningCountdown,
      INACTIVITY_LIMIT - WARNING_DURATION * 1000
    );
  }, [startWarningCountdown]);

  const handleStayLoggedIn = () => {
    showWarningRef.current = false;
    clearTimeout(logoutTimerRef.current);
    clearInterval(countdownIntervalRef.current);
    setShowWarning(false);
    resetInactivityTimers();
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event => window.addEventListener(event, resetInactivityTimers));
    resetInactivityTimers();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetInactivityTimers));
      clearTimeout(warningTimerRef.current);
      clearTimeout(logoutTimerRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, [resetInactivityTimers]);

  return (
    <Container fluid className="dashboard-layout p-0">
      {/* Warning Modal */}
      <Modal show={showWarning} backdrop="static" centered>
        <Modal.Header className="bg-danger text-white">
          <Modal.Title>⚠️ Inactivity Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          You will be automatically logged out in <strong>{countdown}</strong> seconds due to inactivity.
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleStayLoggedIn}>
            Stay Logged In
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="dashboard-main flex-nowrap m-0">
        <Col
          xs={expanded ? 8 : 2}
          md={expanded ? 3 : 1}
          lg={expanded ? 2 : 1}
          sm={expanded ? 2 : 1}
          className="sidebar-wrapper p-0  d-none d-md-block"
        >
          <Sidebar
            role={role}
            expanded={expanded}
            toggleSidebar={() => setExpanded(!expanded)}
          />
        </Col>

        <Col className="d-flex flex-column p-0 outlet-col ">
          <div className="header-fixed">
            <Header toggleSidebar={() => setExpanded(!expanded)} />
          </div>

          <div className="outlet-scrollable p-4" ref={outletRef}>
            <Outlet />
            <ScrollToTopButton containerRef={outletRef} />
          </div>

          <div className="d-md-none mobile-nav-fixed">
            <MobileNavigation role={role} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
