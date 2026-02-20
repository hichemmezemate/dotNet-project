import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5067/api/AdminAuth/login', credentials, {
                withCredentials: true
            });
            navigate('/admin');
        } catch (error) {
            alert("Erreur de connexion (identifiants invalides)");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-900">
            <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-slate-900">Console Admin</h2>
                <input 
                    className="w-full mb-4 p-4 border-none bg-slate-50 rounded-2xl focus:ring-2 focus:ring-brand outline-none" 
                    placeholder="Utilisateur (ex: admin)"
                    onChange={e => setCredentials({...credentials, username: e.target.value})}
                />
                <input 
                    className="w-full mb-8 p-4 border-none bg-slate-50 rounded-2xl focus:ring-2 focus:ring-brand outline-none" 
                    type="password" 
                    placeholder="Mot de passe (ex: admin123)"
                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                />
                <button className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-slate-800 transition-all transform active:scale-[0.98]">
                    Entrer
                </button>
            </form>
        </div>
    );
};