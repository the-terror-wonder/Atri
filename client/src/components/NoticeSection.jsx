import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const NoticeSection = ({ classroomId }) => {
  const { userInfo } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [content, setContent] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('view');

  const fetchNotices = async () => {
    try {
      const { data } = await API.get(`/api/classrooms/${classroomId}/notices`);
      setNotices(data);
    } catch (error) {
      toast.error('Could not fetch notices.');
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [classroomId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/classrooms/${classroomId}/notices`, { content });
      setContent('');
      toast.success('Notice posted!');
      fetchNotices(); // Refetch notices to show the new one
      setActiveSubTab('view'); // Switch back to view
    } catch (error) {
      toast.error('Failed to post notice.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-stone-700">📢 Announcements</h2>
        {userInfo.role === 'faculty' && (
          <div className="flex space-x-2 p-1 bg-stone-100 rounded-lg">
            <button onClick={() => setActiveSubTab('view')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'view' ? 'bg-white shadow' : 'text-stone-600'}`}>
              View All
            </button>
            <button onClick={() => setActiveSubTab('create')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'create' ? 'bg-white shadow' : 'text-stone-600'}`}>
              Post New
            </button>
          </div>
        )}
      </div>
      
      {activeSubTab === 'create' && userInfo.role === 'faculty' && (
        <form onSubmit={submitHandler} className="space-y-3">
          <textarea placeholder="Write an announcement..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border border-stone-300 rounded-md" rows="3" required></textarea>
          <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700">
            Post Announcement
          </button>
        </form>
      )}

      {activeSubTab === 'view' && (
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice._id} className="p-4 border border-stone-200 rounded-lg bg-stone-50">
                <p className="text-stone-800">{notice.content}</p>
                <p className="text-xs text-stone-500 mt-2">Posted on: {new Date(notice.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-stone-500">No announcements have been posted yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeSection;