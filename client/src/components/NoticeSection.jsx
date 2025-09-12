import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const NoticeSection = ({ classroomId }) => {
  const { userInfo } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await API.get(`/api/classrooms/${classroomId}/notices`);
        setNotices(data);
      } catch (error) {
        toast.error('Could not fetch notices.');
      }
    };
    fetchNotices();
  }, [classroomId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data: newNotice } = await API.post(`/api/classrooms/${classroomId}/notices`, { content });
      setNotices([newNotice, ...notices]);
      setContent('');
      toast.success('Notice posted!');
    } catch (error) {
      toast.error('Failed to post notice.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
      <h2 className="text-2xl font-semibold mb-4">📢 Announcements</h2>

      {userInfo.role === 'faculty' && (
        <form onSubmit={submitHandler} className="mb-6 space-y-3">
          <textarea
            placeholder="Write an announcement for your class..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            required
          ></textarea>
          <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Post Announcement
          </button>
        </form>
      )}

      <div className="space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice._id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <p className="text-gray-800">{notice.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted on: {new Date(notice.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No announcements have been posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default NoticeSection;