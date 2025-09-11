import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import StudentDashboard from '../components/StudentDashboard';
import FacultyDashboard from '../components/FacultyDashboard';
// We can add an AdminDashboard later

const DashboardPage = () => {
  const { userInfo } = useContext(AuthContext);

  // Render a different dashboard component based on the user's role
  switch (userInfo.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    // case 'admin':
    //   return <AdminDashboard />;
    default:
      return <h1>Invalid Role</h1>;
  }
};

export default DashboardPage;