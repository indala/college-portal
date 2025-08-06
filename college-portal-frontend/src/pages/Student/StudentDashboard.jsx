import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'react-bootstrap-icons';
import SemesterCGPAChart from '../../components/Dashboard/SemesterChart/SemesterCGPAChart';
import SemesterMarksChart from '../../components/Dashboard/SemesterMarksChart/SemesterMarksChart';
import AttendanceChart from '../../components/Dashboard/AttendanceChart';
import EventCard from '../../components/Dashboard/EventCard';
import LibrarySearchCard from '../../components/Dashboard/LibrarySearchCard';
import NfcCreditsCard from '../../components/Dashboard/NfcCreditsCard';

import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <div className="dashboard-grid">

        <Link to="marks" className="card-link">
          <div className="card semester-chart">
            <h5>Semester CGPA</h5>
            <SemesterCGPAChart />
          </div>
        </Link>

        <Link to="marks" className="card-link">
          <div className="card semester-chart">
            <h5>Semester Marks</h5>
            <SemesterMarksChart />
          </div>
        </Link>

        <Link to="attendance" className="card-link">
          <div className="card attendance">
            <h5>Attendance</h5>
            <AttendanceChart percentage={92} totalDays={180} attendedDays={166} />
          </div>
        </Link>

        <Link to="question-bank" className="card-link">
          <div className="card prev-papers">
            <h5>Previous Year Question Papers</h5>
            <div className="icon-download mb-5 pb-4">
              <Download size={100} />
            </div>
          </div>
        </Link>

        <Link to="nfc-credits" className="card-link">
          <div className="card NFC">
            <h5>NFC Credits</h5>
            <NfcCreditsCard balance={200} lastRecharge="₹300 on 04 Aug" />
          </div>
        </Link>

        <Link to="notifications" className="card-link">
          <div className="card NFC">
            <h5>Events</h5>
            <EventCard
              title="Technical Fest 2025"
              date="06 August 2025"
              description="Join us for the annual Tech Fest with workshops, coding contests, and more."
              attachment="/files/techfest-brochure.pdf"
            />
          </div>
        </Link>

        <Link to="library" className="card-link">
          <div className="card NFC">
            <h5>Library Search</h5>
            <LibrarySearchCard />
          </div>
        </Link>

      </div>
    </div>
  );
};

export default StudentDashboard;
