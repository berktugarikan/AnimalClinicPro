import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Kullanıcı girişi kontrolü
    /*if (!username || !password) {
        alert('Kullanıcı adı ve şifre girilmelidir.');
        return;
      }*/

    // Başarılı giriş durumunda yönlendirme
    navigate.push('/vetmainpage');
  };

  return (
    /*<div>
      <h1>Login Page</h1>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}*/

    <div className="container">
    <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
    < form className= "card">
            <div className="text-center card-header">
                    <h1 style={{ color:'#6c9286'} }>Login</h1>
                </div>
                <div className="card-body"> 
    <div className="mb-3">
        <label htmlFor="username" className="form-label">UserName:</label>
                <input id="username"
        className="form-control"
            onChange={(event) => setUserName(event.target.value)}
        />
    </div>
    <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input id="password" type="password" className="form-control"
            onChange={(event) => setPassword(event.target.value)}
        />
    </div>
    <div className="text-center">
            <button
            className="btn btn-primary"
                disabled={!username || !password  } onClick={handleLogin} >Login</button>
                    </div>
                </div>
        </form >
        </div>
    </div>


);



}
export default LoginPage;
