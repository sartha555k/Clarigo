import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserModal = ({ isOpen, onClose, user, refresh, token }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    } else {
      setFormData({ name: '', email: '', password: '', role: '' });
    }
    setErrors({});
    setApiError('');
  }, [user, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email) {
      newErrors.email = 'Required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!user && !formData.password) { // password required only for Add
      newErrors.password = 'Required';
    }
    if (!formData.role) newErrors.role = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (user) {
        // Edit Mode: only send password if it's provided
        const updateData = { name: formData.name, email: formData.email, role: formData.role };
        if (formData.password) updateData.password = formData.password;
        await axios.put(`http://localhost:8999/api/users/${user._id}`, updateData, config);
      } else {
        // Add Mode
        await axios.post('http://localhost:8999/api/users', formData, config);
      }
      refresh();
      onClose();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Operation failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{user ? 'Edit User' : 'Add New User'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        
        {apiError && <div className="error-text" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#FEF2F2', borderRadius: '4px' }}>{apiError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Password {user && <span style={{fontSize: '0.8em', color: '#999'}}>(Leave blank to keep unchanged)</span>}</label>
            <input type="password" className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="">Select a role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">{user ? 'Save Changes' : 'Add User'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
