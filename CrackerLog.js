import React, { useState, useEffect } from 'react';
import API from '../api/api';
import './CrackerLog.css'; // create custom styles

const CrackerLog = () => {
  const [crackerType, setCrackerType] = useState('Rocket');
  const [quantity, setQuantity] = useState(1);
  const [logs, setLogs] = useState([]);

  // Pollution values for each cracker type
  const pollutionMap = {
    Rocket: 3,
    Sparkler: 1,
    Bomb: 5
  };

  // Submit new cracker log
  const submitLog = async (e) => {
    e.preventDefault();
    const pollutionScore = pollutionMap[crackerType] * quantity;

    try {
      await API.post('/logs', { crackerType, quantity, pollutionScore });
      fetchLogs();
      setQuantity(1); // reset input
    } catch (err) {
      console.error('Failed to add log', err);
    }
  };

  // Fetch all logs
  const fetchLogs = async () => {
    try {
      const res = await API.get('/logs');
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to load logs', err);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <div className="cracker-log">
      <h2>🪔 Crackers Pollution Log</h2>

      {/* Form */}
      <form onSubmit={submitLog} className="log-form">
        <label>
          Type:
          <select value={crackerType} onChange={e => setCrackerType(e.target.value)}>
            <option value="Rocket">🚀 Rocket</option>
            <option value="Sparkler">✨ Sparkler</option>
            <option value="Bomb">💣 Bomb</option>
          </select>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min="1"
          />
        </label>

        <button type="submit">+ Add Log</button>
      </form>

      {/* History */}
      <h3>📜 Your Logs</h3>
      {logs.length === 0 ? (
        <p>No logs yet. Start adding 🚀</p>
      ) : (
        <ul className="log-list">
          {logs.map(log => (
            <li key={log._id} className="log-item">
              <span className="date">{log.date.slice(0, 10)}</span>
              <span className="type">{log.crackerType} × {log.quantity}</span>
              <span className="points">⚡ {log.pollutionScore} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CrackerLog;
