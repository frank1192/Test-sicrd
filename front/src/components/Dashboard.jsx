import { useState, useEffect } from 'react';
import { authService } from '../services/api';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome to the Dashboard!</h1>
        {user && (
          <div className="user-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
        )}
        <div className="dashboard-content">
          <p>You have successfully logged in to the application.</p>
          <p>This is a protected area that requires authentication.</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
