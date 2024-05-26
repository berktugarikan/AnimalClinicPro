import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VetSifreDegistirme = () => {
    const [mevcutSifre, setMevcutSifre] = useState('');
    const [yeniSifre, setYeniSifre] = useState('');
    const [yeniSifreTekrar, setYeniSifreTekrar] = useState('');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const sifreDegistir = async () => {
        if (!userId) {
            alert('Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
            return;
        }

        if (yeniSifre !== yeniSifreTekrar) {
            alert('Şifreler uyuşmuyor');
            return;
        }

        setLoading(true);

        const body = {
            oldPassword: mevcutSifre,
            newPassword: yeniSifre
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/users/change-password/${userId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`, // Bearer tokeni Authorization başlığı altında gönderiyoruz
                    'Content-Type': 'application/json'
                }
            });

            console.log('Şifre değiştirildi:', response.data);
            alert('Şifre değiştirildi');
        } catch (error) {
            console.error('Şifre değiştirilirken bir hata oluştu:', error.response ? error.response.data : error.message);
            alert('Şifre değiştirilirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', padding: '10px' }}>
            <h1 style={{ color: '#6c9286' }}>Animal Clinic Pro</h1>
            <form>
                <div className="mb-2">
                    <label htmlFor="mevcutSifre" className="form-label">Current Password:</label>
                    <input
                        type="password"
                        value={mevcutSifre}
                        className="form-control"
                        onChange={(e) => setMevcutSifre(e.target.value)}
                    />
                </div>
                <br />
                <div className="mb-3">
                    <label htmlFor="yeniSifre" className="form-label">New Password:</label>
                    <input
                        type="password"
                        value={yeniSifre}
                        className="form-control"
                        onChange={(e) => setYeniSifre(e.target.value)}
                    />
                </div>
                <br />
                <div className="mb-3">
                    <label htmlFor="yeniSifreTekrar" className="form-label">New Password Repeat:</label>
                    <input
                        type="password"
                        value={yeniSifreTekrar}
                        className="form-control"
                        onChange={(e) => setYeniSifreTekrar(e.target.value)}
                    />
                </div>
                <br />
                <div className="text-center">
                    <button className="btn btn-primary" type="button" onClick={sifreDegistir} disabled={loading}>
                        {loading ? 'Changing Password...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VetSifreDegistirme;
