import React, { useState } from 'react';

const VetŞifreDeğiştirme = () => {
 const [mevcutŞifre, setMevcutŞifre] = useState('');
 const [yeniŞifre, setYeniŞifre] = useState('');
 const [yeniŞifreTekrar, setYeniŞifreTekrar] = useState('');

 const sifreDegistir = () => {
    if (yeniŞifre === yeniŞifreTekrar) {
      alert('Şifre değiştirildi');
    } else {
      alert('Şifreler uyuşmuyor');
    }
 };

 return (
    <div>
      <h1 style={{ color:'#6c9286'}}>Animal Clinic Pro</h1>
      <form>
      <div className="mb-2">
        <label htmlFor="mevcutşifre" className="form-label">Current Password:</label>
          <input
            type="password"
            value={mevcutŞifre}
            className="form-control"
            onChange={(e) => setMevcutŞifre(e.target.value)}
          />
          </div>
        <br />
        <div className="mb-3">
        <label htmlFor="yenişifre" className="form-label"> New Password:</label>
          <input
            type="password"
            value={yeniŞifre}
            className="form-control"
            onChange={(e) => setYeniŞifre(e.target.value)}
          />
          </div> 
        <br />
        <div className="mb-3">
        <label htmlFor="yenişifretekrar" className="form-label">New Password Repeat:</label>
          <input
            type="password"
            value={yeniŞifreTekrar}
            className="form-control"
            onChange={(e) => setYeniŞifreTekrar(e.target.value)}
          />
          </div>
        <br />
        <div className="text-center">
        <button  className="btn btn-primary" type="button" disabled={!mevcutŞifre || !yeniŞifre || !yeniŞifreTekrar || !(yeniŞifre== yeniŞifreTekrar) || !(mevcutŞifre==yeniŞifre==yeniŞifreTekrar) } onClick={sifreDegistir}>
          Change Password
        </button>
        </div>
      </form>
    </div>
 );
};

export default VetŞifreDeğiştirme;