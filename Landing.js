import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  useEffect(() => {
    for (let i = 0; i < 40; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = Math.random() * 100 + 'vw';
      sparkle.style.animationDuration = 4 + Math.random() * 4 + 's';
      sparkle.style.animationDelay = Math.random() * 5 + 's';
      sparkle.style.background = ['#ffd700', '#ff69b4', '#87cefa', '#adff2f'][Math.floor(Math.random() * 4)];
      document.body.appendChild(sparkle);
    }
  }, []);

  return (
    <div className="landing">
      <div className="decor">
        <div className="diya"></div>
        <div className="diya"></div>
        <div className="diya"></div>
      </div>

      <div className="hero">
        <h1>🪔 Welcome to EcoSpark 🪔</h1>
        <p>Celebrate a Green Diwali by tracking your eco-friendly choices 🎇</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn secondary">Register</Link>
        </div>
      </div>
    </div>
  );
}
