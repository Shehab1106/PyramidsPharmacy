import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/medications/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMedications(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch medications.');
      }
    };
    fetchMedications();
  }, []);

  const handleRefillRequest = async (medicationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/refill/',
        { medication: medicationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Refill request submitted.');
      setError('');

      setTimeout(() => {
        setSuccess('');
      }, 1000);
    } catch (err) {
      setSuccess('');
      setError('Failed to submit refill request.');
    }
  };

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <div id="medication-list-page" className="medication-page">
      <h1>Medication List</h1>
      {error && <p id="medication-error-message" className="error-message">{error}</p>}
      {success && <p id="medication-success-message" className="success-message">{success}</p>}
      <ul id="medication-list" className="medication-list">
        {medications.map((med) => (
          <li key={med.id} className="medication-item" id={`medication-item-${med.id}`}>
            <h3 id={`medication-name-${med.id}`} className="medication-name">{med.name}</h3>
            <button
              onClick={() => handleRefillRequest(med.id)}
              id={`medication-refill-button-${med.id}`}
              className="medication-refill-button"
            >
              Request Refill
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleDashboardRedirect}
        id="dashboard-redirect-button"
        className="top-right-button"
      >
        Dashboard
      </button>
    </div>
  );
};

export default MedicationList;

