import React, { useState } from 'react';
import AdminUserList from './AdminUserList';
import AdminClassroomList from './AdminClassroomList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-800 mb-8">Admin Dashboard</h1>
      <div className="mb-4 border-b border-stone-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('users')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${
              activeTab === 'users'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('classrooms')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${
              activeTab === 'classrooms'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
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