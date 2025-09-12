import React, { useState } from 'react';
import AdminUserList from './AdminUserList';
import AdminClassroomList from './AdminClassroomList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('users')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('classrooms')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'classrooms'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Classroom Management
          </button>
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === 'users' && <AdminUserList />}
        {activeTab === 'classrooms' && <AdminClassroomList />}
      </div>
    </div>
  );
};

export default AdminDashboard;