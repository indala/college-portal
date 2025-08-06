// navigationConfig.js
import {
  HouseDoor,
  ClipboardData,
  BarChart,
  JournalCheck,
  Book,
  People,
  PersonCircle,
  Upload,
  FileEarmarkText,
  Bell,
  EnvelopeOpen,
} from 'react-bootstrap-icons';

const navigationConfig = {
  student: [
    { label: 'Dashboard', to: '/dashboard/student', icon: HouseDoor },
    { label: 'My Attendance', to: '/dashboard/student/attendance', icon: ClipboardData },
    { label: 'Marks', to: '/dashboard/student/marks', icon: BarChart },
    { label: 'Notifications', to: '/dashboard/student/notifications', icon: JournalCheck },
    { label: 'NFC Credits', to: '/dashboard/student/nfc', icon: Book },
    { label: 'Time Table', to: '/dashboard/student/timetable', icon: Book },
    { label: 'Question Bank', to: '/dashboard/student/questions', icon: Book },
    { label: 'Hostel/Bus', to: '/dashboard/student/services', icon: Book },
  ],

  faculty: [
    { label: 'Dashboard', to: '/dashboard/faculty', icon: HouseDoor },
    { label: 'Time Table', to: '/dashboard/faculty/timetable', icon: Book },
    { label: 'Notifications', to: '/dashboard/faculty/notifications', icon: Bell },
    { label: 'Sent Notifications', to: '/dashboard/faculty/sent', icon: EnvelopeOpen },
    { label: 'Add Attendance', to: '/dashboard/faculty/add-attendance', icon: ClipboardData },
    { label: 'Mark Marks', to: '/dashboard/faculty/mark-marks', icon: BarChart },
    { label: 'Student Profiles', to: '/dashboard/faculty/students', icon: People },
  ],

  hod: [
    { label: 'Dashboard', to: '/dashboard/hod', icon: HouseDoor },
    { label: 'Time Table', to: '/dashboard/hod/timetable', icon: Book },
    { label: 'Post Notice', to: '/dashboard/hod/notice', icon: Bell },
    { label: 'Sent Notifications', to: '/dashboard/hod/sent', icon: EnvelopeOpen },
    { label: 'Add Attendance', to: '/dashboard/hod/add-attendance', icon: ClipboardData },
    { label: 'Mark Marks', to: '/dashboard/hod/mark-marks', icon: BarChart },
    { label: 'Student Profiles', to: '/dashboard/hod/students', icon: People },
  ],

  manager: [
    { label: 'Dashboard', to: '/dashboard/manager', icon: HouseDoor },
    { label: 'Register Students', to: '/dashboard/manager/register', icon: PersonCircle },
    { label: 'Bulk Upload', to: '/dashboard/manager/upload', icon: Upload },
    { label: 'Assign NFC IDs', to: '/dashboard/manager/nfc', icon: FileEarmarkText },
  ],

  admin: [
    { label: 'Dashboard', to: '/dashboard/admin', icon: HouseDoor },
    { label: 'Manage Faculty', to: '/dashboard/admin/faculty', icon: PersonCircle },
    { label: 'Manage Students', to: '/dashboard/admin/students', icon: People },
  ],

  parent: [
    { label: 'Dashboard', to: '/dashboard/parent', icon: HouseDoor },
    { label: 'Attendance', to: '/dashboard/parent/attendance', icon: ClipboardData },
    { label: 'Marks', to: '/dashboard/parent/marks', icon: BarChart },
    { label: 'Notifications', to: '/dashboard/parent/notifications', icon: JournalCheck },
  ],
};

export default navigationConfig;
