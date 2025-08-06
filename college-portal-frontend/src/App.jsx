import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Library from './pages/Library/Library';
import Courses from './pages/Courses/Courses';
import Login from './pages/Login/Login';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/Layout/DashboardLayout/DashboardLayout';

import StudentDashboard from './pages/Student/StudentDashboard';
import FacultyDashboard from './pages/Faculty/FacultyDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ParentDashboard from './pages/Parent/ParentDashboard';
import HODDashboard from './pages/HOD/HODDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
// You can import HOD, Manager, and Parent dashboards later

import Attendance from './components/Attendance/Attendance';
import Notifications from './components/Notifications/Notifications';

function App() {
  return (
    <>    <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />            {/* / */}
        <Route path="about" element={<About />} />     {/* /about */}
        <Route path="library" element={<Library />} /> {/* /library */}
        <Route path="courses" element={<Courses />} /> {/* /Courses */}
      </Route>


      <Route path="/login"  element={<Login/>}/>
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Student Dashboard */}
      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout role="student" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Faculty Dashboard */}
      <Route
        path="/dashboard/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <DashboardLayout role="faculty" />
          </ProtectedRoute>
        }
      >
        <Route index element={<FacultyDashboard />} />
      </Route>

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* Parent Dashboard */}
      <Route
        path="/dashboard/parent"
        element={
          <ProtectedRoute allowedRoles={['parent']}>
            <DashboardLayout role="parent" />
          </ProtectedRoute>
        }
      >
        <Route index element={<ParentDashboard />} />
      </Route>


            {/* HOD Dashboard */}
      <Route
        path="/dashboard/hod"
        element={
          <ProtectedRoute allowedRoles={['hod']}>
            <DashboardLayout role="hod" />
          </ProtectedRoute>
        }
      >
        <Route index element={<HODDashboard />} />
      </Route>


      {/* Manager Dashboard */}
      <Route
        path="/dashboard/manager"
        element={
          <ProtectedRoute allowedRoles={['manager']}>
            <DashboardLayout role="manager" />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagerDashboard />} />
      </Route>
      

      
      {/* Add more roles later like HOD, Manager, Parent, etc. */}
    </Routes>
    <ScrollToTopButton />

  </>

  );
}

export default App;
