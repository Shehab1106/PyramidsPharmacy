import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [refillData, setRefillData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefillData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/statistics/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data)) {
          setRefillData(response.data);
        } else {
          setError('Invalid data format received.');
        }
      } catch (err) {
        console.error('Error fetching refill data:', err);
        setError('Failed to fetch refill data.');
      }
    };

    fetchRefillData();
  }, []);


  const chartData = {
    labels: refillData.map(item => item.medication__name || 'Unknown'),
    datasets: [
      {
        label: 'Refill Requests',
        data: refillData.map(item => item.total_requests || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Refill Requests Overview',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} requests`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Medications',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Requests',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
  };

  const goToMedicationList = () => {
    navigate('/medication-list');
  };

  return (
    <div id="dashboard-container" className="dashboard-container">
      <h1>Dashboard</h1>
      {error && <p id="dashboard-error-message" className="message error">{error}</p>}
      <div id="chart-container" className="chart-container">
        {refillData.length > 0 ? (
          <Bar id="refill-chart" data={chartData} options={chartOptions} />
        ) : (
          <p id="no-data-message" className="message">No refill data available.</p>
        )}
      </div>
      <button id="medication-list-button" className="navigation-button top-right-button" onClick={goToMedicationList}>
        Go to Medication List
      </button>
    </div>
  );
};

export default Dashboard;
