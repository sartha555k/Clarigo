import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import UserModal from '../components/UserModal';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    if (user.role !== 'Admin') return;
    try {
      const res = await axios.get('https://clarigo.onrender.com/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout(); // Token invalid or expired
      }
      console.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`https://clarigo.onrender.com/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user');
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEditModal = (u) => {
    setEditingUser(u);
    setModalOpen(true);
  };

  if (user.role === 'User') {
    return (
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
          <h2 style={{ fontSize: '2rem' }}>Welcome, {user.name}!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            You are logged in as a <strong>User</strong>.
          </p>
          <button onClick={logout} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Log Out</button>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>User Management</h2>
        <button onClick={openAddModal} className="btn btn-primary">+ Add User</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td style={{ fontWeight: 500 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.role.toLowerCase()}`}>{u.role}</span>
                </td>
                <td>
                  <div className="actions">
                    <button onClick={() => openEditModal(u)} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Edit</button>
                    <button onClick={() => handleDelete(u._id)} className="btn btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <UserModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          user={editingUser} 
          refresh={fetchUsers}
          token={token}
        />
      )}
    </div>
  );
};

export default Dashboard;
