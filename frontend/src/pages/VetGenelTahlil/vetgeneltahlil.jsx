import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectionBar from '@/shared/components/SelectionBar';
import axios from 'axios';


const VetGenelTahlil = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);

  useEffect(() => {
 
    axios.get('http://localhost:3001/api/lab-results')
      .then(response => setResults(response.data))
      .catch(error => console.error('Error fetching lab results:', error));
  }, []);

  
  const endpointParam = location.pathname;

  useEffect (() => {
    if (endpointParam === '/vetlaboratory') {
      navigate('/vetgeneltahlil');
    }
  }, [endpointParam, navigate]);

  return (
    <div>
      <h2>Lab Results</h2>
      <SelectionBar />
      <ul>
        {results.map(result => (
          <li key={result._id}>{result.name}: {result.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default VetGenelTahlil;
