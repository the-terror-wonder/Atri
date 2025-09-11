import React, { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StudentAssignmentList = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await API.get(
          `/api/classrooms/${classroomId}/assignments`
        );
        setAssignments(data);
      } catch (error) {
        toast.error("Could not fetch assignments.");
      }
    };

    if (classroomId) {
      fetchAssignments();
    }
  }, [classroomId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
      <div className="space-y-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Link
              key={assignment._id}
              to={`/assignment/${assignment._id}`}
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <h4 className="font-bold text-indigo-600">{assignment.title}</h4>
              <p className="text-gray-600">{assignment.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted on: {new Date(assignment.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            No assignments have been posted for this class yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentList;
