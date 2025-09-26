import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tips.css';

export default function Tips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tips')
      .then(res => setTips(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="tips-container">
      <h2>Eco Tips & Alternatives</h2>
      <div className="tips-grid">
        {tips.map(t => (
          <div key={t._id} className="tip-card">
            <img src={t.imageUrl} alt={t.title} className="tip-image"/>
            <div className="tip-content">
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p><b>Why:</b> {t.ecoReason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
