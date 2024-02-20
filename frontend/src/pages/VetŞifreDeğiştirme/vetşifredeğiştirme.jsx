import React, {useEffect, useState} from 'react';
import axios from "axios";

const VetŞifreDeğiştirme = () => {
    const [mevcutŞifre, setMevcutŞifre] = useState('');
    const [yeniŞifre, setYeniŞifre] = useState('');
    const [yeniŞifreTekrar, setYeniŞifreTekrar] = useState('');
    const [user, setUser] = useState('');


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        setUser(user);
    }, []);

    const sifreDegistir = async () => {
        if (yeniŞifre === yeniŞifreTekrar) {

            const body = {
                id: Number(user.id),
                password: yeniŞifre
            };

            const response = await axios.put(`http://localhost:8080/api/users/change-password`, body);

            alert('Şifre değiştirildi');
        } else {
            alert('Şifreler uyuşmuyor');
        }
    };


    return (
        <div>
            <h1 style={{color: '#6c9286'}}>Animal Clinic Pro</h1>
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
                <br/>
                <div className="mb-3">
                    <label htmlFor="yenişifre" className="form-label"> New Password:</label>
                    <input
                        type="password"
                        value={yeniŞifre}
                        className="form-control"
                        onChange={(e) => setYeniŞifre(e.target.value)}
                    />
                </div>
                <br/>
                <div className="mb-3">
                    <label htmlFor="yenişifretekrar" className="form-label">New Password Repeat:</label>
                    <input
                        type="password"
                        value={yeniŞifreTekrar}
                        className="form-control"
                        onChange={(e) => setYeniŞifreTekrar(e.target.value)}
                    />
                </div>
                <br/>
                <div className="text-center">
                    <button className="btn btn-primary" type="button"
                            onClick={sifreDegistir}>
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VetŞifreDeğiştirme;
