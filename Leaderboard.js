import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './Leaderboard.css'; // for styles

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get('/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>🌟 Green Families Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Name</span>
          <span>Eco Points</span>
        </div>
        {users.map((u, index) => (
          <div key={u._id} className="leaderboard-row">
            <span className="rank">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
            </span>
            <span className="name">{u.name}</span>
            <span className="points">{u.ecoPoints}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
