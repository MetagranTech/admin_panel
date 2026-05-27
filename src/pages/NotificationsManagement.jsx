import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Bell } from 'lucide-react';
import { getNotifications, createNotification, deleteNotification } from '../api';

export default function NotificationsManagement() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '', type: 'offer', targetApp: 'customer' });

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotifications();
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreate = async () => {
    if (!formData.title || !formData.body) return alert('Please fill all fields');
    try {
      const res = await createNotification(formData);
      if (res.data.success) {
        setShowAddModal(false);
        setFormData({ title: '', body: '', type: 'offer', targetApp: 'customer' });
        fetchNotifications();
      }
    } catch (error) {
      alert('Error creating notification');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    try {
      const res = await deleteNotification(id);
      if (res.data.success) {
        fetchNotifications();
      }
    } catch (error) {
      alert('Error deleting notification');
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Push Notifications</h3>
          <p className="text-slate-500">Manage community reviews and broadcast offers.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus size={18} />
          Post New Offer/Update
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading notifications...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
                <th className="pb-4 px-4">Type</th>
                <th className="pb-4 px-4">Content</th>
                <th className="pb-4 px-4">Target</th>
                <th className="pb-4 px-4">Date</th>
                <th className="pb-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map(notif => (
                <tr key={notif._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      notif.type === 'review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {notif.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{notif.title}</span>
                      <span className="text-sm text-slate-500 line-clamp-1">{notif.body}</span>
                      {notif.userName && (
                        <span className="text-xs text-primary mt-1">By {notif.userName} • {notif.rating}★</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 capitalize font-medium text-slate-600">
                    {notif.targetApp || 'customer'}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(notif._id)}
                      className="p-2 text-error hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-slate-400">No notifications found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h4 className="text-2xl font-bold mb-6">Post New Update</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notification Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g. Weekend Flash Sale!"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message Body</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe your offer or update..."
                  value={formData.body}
                  onChange={(e) => setFormData({...formData, body: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="offer">Offer</option>
                    <option value="update">Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target App</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
                    value={formData.targetApp}
                    onChange={(e) => setFormData({...formData, targetApp: e.target.value})}
                  >
                    <option value="customer">Customer</option>
                    <option value="service">Service Man</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button 
                onClick={handleCreate}
                className="flex-1 px-6 py-3 bg-[#1068A8] text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <Bell size={18} />
                Send Push
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
