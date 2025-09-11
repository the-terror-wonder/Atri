import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClassrooms = async () => {
      try {
        const { data } = await API.get('/api/classrooms/enrolled');
        setClassrooms(data);
      } catch (error) {
        toast.error('Could not fetch your classrooms.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClassrooms();
  }, []);

  if (loading) {
    return <div>Loading your classrooms...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Classrooms</h1>
      <div className="space-y-4">
        {classrooms.length > 0 ? (
          classrooms.map((classroom) => (
            <Link
              key={classroom._id}
              to={`/classroom/${classroom._id}`} // Links to the same detail page
              className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium text-indigo-600">{classroom.name}</h3>
                  <p className="text-sm text-gray-500">
                    Taught by: {classroom.faculty.name}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {classroom.students.length} Student(s)
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">You are not yet enrolled in any classrooms.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;