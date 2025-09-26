import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './Challenges.css';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const userId = localStorage.getItem("userId"); // 👈 store this after login

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await API.get('/challenges');
        setChallenges(res.data);
      } catch (err) {
        console.error("Error fetching challenges", err);
      }
    };
    fetchChallenges();
  }, []);

  const acceptChallenge = async (ch) => {
    try {
      await API.post('/leaderboard/add-points', { userId, points: ch.points });
      alert(`✅ You earned ${ch.points} Eco Points!`);
    } catch (err) {
      console.error("Failed to update points", err);
    }
  };

  return (
    <div className="challenges-page">
      <h2 className="title">🏆 Eco Challenges</h2>
      <div className="challenge-grid">
        {challenges.map(ch => (
          <div key={ch._id} className="challenge-card">
            <h3>{ch.title}</h3>
            <p>{ch.description || "Take this eco-friendly step!"}</p>
            <p className="target">🎯 {ch.target}</p>
            <span className="reward">+{ch.points} pts</span>
           <button
  className="accept-btn"
  onClick={(e) => {
    acceptChallenge(ch);
    const spark = document.createElement("span");
    spark.className = "spark";
    e.target.appendChild(spark);
    setTimeout(() => spark.remove(), 1000); // remove after animation
  }}
>
  Accept
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
