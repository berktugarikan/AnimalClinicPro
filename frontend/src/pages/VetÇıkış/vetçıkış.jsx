import React, { useState } from 'react';

const VetÇıkış = (props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = () => {
    if (password && confirmPassword && password === confirmPassword) {
      localStorage.removeItem('userData');
      props.history.push('/homepage');
    } else {
      props.history.push('/vetmainpage');
    }
  };

  return (
    <div>
      <h1 style={{ color: '#6c9286' }}>Logout</h1>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="mb-2">
        <label htmlFor="confirmPassword" className="form-label">
          Password Repeat:
        </label>
        <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary"
          type="button"
          disabled={!password || !confirmPassword || !(password === confirmPassword)}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default VetÇıkış;
