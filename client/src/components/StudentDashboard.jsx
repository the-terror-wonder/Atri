import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClassrooms = async () => {
      try {
        const { data } = await API.get("/api/classrooms/enrolled");
        setClassrooms(data);
      } catch (error) {
        toast.error("Could not fetch your classrooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClassrooms();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Loading your classrooms...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-800 mb-8">
        Your Classrooms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.length > 0 ? (
          classrooms.map((classroom) => (
            <Link
              key={classroom._id}
              to={`/classroom/${classroom._id}`}
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {classroom.name}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Taught by: {classroom.faculty.name}
                  </p>
                </div>
                <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {classroom.students.length} Student(s)
                </span>
              </div>
              <p className="mt-4 text-sm text-stone-600">
                Click to view assignments and quizzes.
              </p>
            </Link>
          ))
        ) : (
          <p className="text-stone-500 col-span-full">
            You are not yet enrolled in any classrooms.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
