import React, { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data } = await API.get("/api/classrooms/all");
        setClassrooms(data);
      } catch (error) {
        toast.error("Could not fetch classrooms.");
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  const deleteHandler = async (classroomId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this classroom and all its data?"
      )
    ) {
      try {
        await API.delete(`/api/classrooms/${classroomId}`);
        toast.success("Classroom deleted successfully");
        setClassrooms(classrooms.filter((c) => c._id !== classroomId));
      } catch (error) {
        toast.error("Failed to delete classroom.");
      }
    }
  };

  if (loading) return <div>Loading classrooms...</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-stone-200">
        <thead className="bg-stone-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              Classroom Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              Faculty
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-200">
          {classrooms.map((c) => (
            <tr key={c._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                <Link
                  to={`/classroom/${c._id}`}
                  className="hover:text-amber-600"
                >
                  {c.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                {c.faculty?.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteHandler(c._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClassroomList;
