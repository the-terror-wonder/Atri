import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const FacultyDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data } = await API.get("/api/classrooms");
        setClassrooms(data);
      } catch (error) {
        toast.error("Could not fetch classrooms.");
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  const createClassroomHandler = async (e) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      return toast.error("Classroom name cannot be empty.");
    }
    try {
      const { data: newClassroom } = await API.post("/api/classrooms", {
        name: newClassName,
      });
      setClassrooms([...classrooms, newClassroom]);
      setNewClassName("");
      toast.success("Classroom created successfully!");
    } catch (error) {
      toast.error("Failed to create classroom.");
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-800 mb-8">
        Faculty Dashboard
      </h1>

      {/* Create Classroom Form */}
      <div className="mb-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-stone-700 mb-4">
          Create a New Classroom
        </h2>
        <form
          onSubmit={createClassroomHandler}
          className="flex flex-col sm:flex-row sm:space-x-4"
        >
          <input
            type="text"
            placeholder="e.g., Grade 10 Physics"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            className="flex-grow px-4 py-2 mb-2 sm:mb-0 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-6 py-2 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 shadow-sm transition-colors"
          >
            Create Classroom
          </button>
        </form>
      </div>

      {/* List of Classrooms */}
      <div>
        <h2 className="text-2xl font-semibold text-stone-700 mb-4">
          Your Classrooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <Link
                key={classroom._id}
                to={`/classroom/${classroom._id}`}
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-800">
                    {classroom.name}
                  </h3>
                  <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {classroom.students.length} Student(s)
                  </span>
                </div>
                <p className="mt-4 text-sm text-stone-600">
                  Click to manage assignments, quizzes, and students.
                </p>
              </Link>
            ))
          ) : (
            <p className="text-stone-500 col-span-full">
              You have not created any classrooms yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
