import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const FormPage = () => {
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();
    const [form, setForm] = useState({ nom: "", prenom: "", objet: "", description: "", email: accounts[0]?.username });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await instance.acquireTokenSilent({
            scopes: [import.meta.env.VITE_MSAL_SCOPE_API],
            account: accounts[0]
        });
        await axios.post('http://localhost:5067/api/Demande', form, {
            headers: { Authorization: `Bearer ${token.accessToken}` }
        });
        navigate("/");
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-100">
                <header className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nouveau Dossier</h2>
                    <p className="text-slate-500 mt-2 font-medium">Remplissez les informations ci-dessous pour soumettre votre demande.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 px-1">NOM</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand transition-all outline-none" 
                                placeholder="Nom" onChange={e => setForm({...form, nom: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 px-1">PRÉNOM</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand transition-all outline-none" 
                                placeholder="Prénom" onChange={e => setForm({...form, prenom: e.target.value})} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 px-1">OBJET DE LA DEMANDE</label>
                        <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand transition-all outline-none" 
                            placeholder="Titre de votre dossier" onChange={e => setForm({...form, objet: e.target.value})} required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 px-1">DESCRIPTION</label>
                        <textarea rows="4" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand transition-all outline-none resize-none" 
                            placeholder="Détails de votre demande..." onChange={e => setForm({...form, description: e.target.value})} required />
                    </div>

                    <button type="submit" className="w-full bg-brand text-white font-bold py-5 rounded-2xl shadow-lg shadow-brand/30 hover:bg-blue-700 transition-all transform active:scale-[0.98]">
                        Soumettre le dossier
                    </button>
                </form>
            </div>
        </div>
    );
};