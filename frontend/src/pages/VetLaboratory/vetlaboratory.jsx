import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LabResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
 
    axios.get('http://localhost:3001/api/lab-results')
      .then(response => setResults(response.data))
      .catch(error => console.error('Error fetching lab results:', error));
  }, []);

  return (
    <div>
      <h2>Lab Results</h2>
      <ul>
        {results.map(result => (
          <li key={result._id}>{result.name}: {result.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default LabResults;
