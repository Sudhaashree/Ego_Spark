import React, { useEffect, useState } from 'react';
import API from '../api/api';
// import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await API.get('/logs');
      setLogs(res.data);

      // fetch AQI
      const city = res.data[0]?.userLocation || 'Chennai';
      const aqiRes = await fetch(`https://api.waqi.info/feed/${city}/?token=demo`); // replace 'demo' with real AQI token
      const data = await aqiRes.json();
      setAqi(data.data.aqi);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>🎆 Dashboard</h2>
      <div className="aqi-widget">
        <h3>Current AQI: {aqi ?? 'Loading...'}</h3>
      </div>
      <div className="chart-container">
        <h3>Your Pollution Score</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={logs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pollutionScore" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
