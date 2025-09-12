import React, { useState } from 'react';
import AssignmentList from './AssignmentList';
import CreateAssignmentForm from './CreateAssignmentForm';

const AssignmentSection = ({ classroomId }) => {
  const [activeSubTab, setActiveSubTab] = useState('view');

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-stone-700">📝 Assignments</h2>
        <div className="flex space-x-2 p-1 bg-stone-100 rounded-lg">
          <button 
            onClick={() => setActiveSubTab('view')}
            className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'view' ? 'bg-white shadow' : 'text-stone-600'}`}
          >
            View All
          </button>
          <button 
            onClick={() => setActiveSubTab('create')}
            className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'create' ? 'bg-white shadow' : 'text-stone-600'}`}
          >
            Post New
          </button>
        </div>
      </div>

      {/* Conditionally render the content based on the active sub-tab */}
      <div>
        {activeSubTab === 'view' && <AssignmentList classroomId={classroomId} />}
        {activeSubTab === 'create' && (
          <CreateAssignmentForm 
            classroomId={classroomId} 
            onAssignmentCreated={() => setActiveSubTab('view')} // Switch back to view after creation
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentSection;