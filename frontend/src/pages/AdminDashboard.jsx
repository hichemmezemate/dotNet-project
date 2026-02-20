import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5067/api/Demande/all', {
                withCredentials: true
            });
            setDemandes(res.data);
            setLoading(false);
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/admin-login');
            }
        }
    };

    useEffect(() => { fetchData(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`http://localhost:5067/api/Demande/${id}/status`, `"${status}"`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            fetchData();
        } catch (error) {
            alert("Erreur lors de la mise à jour");
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-500">Chargement...</div>;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-slate-900">Dossiers en attente</h1>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-8 py-4">Utilisateur</th>
                            <th className="px-8 py-4">Objet</th>
                            <th className="px-8 py-4">Statut Actuel</th>
                            <th className="px-8 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {demandes.map((d) => {
                            const isProcessed = d.status !== 'En attente';

                            return (
                                <tr key={d.id} className="hover:bg-slate-50 transition">
                                    <td className="px-8 py-4">
                                        <div className="font-bold text-slate-900">{d.nom} {d.prenom}</div>
                                        <div className="text-xs text-slate-400 font-medium">{d.email}</div>
                                    </td>
                                    <td className="px-8 py-4 font-medium text-slate-700">{d.objet}</td>
                                    <td className="px-8 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            d.status === 'Validé' ? 'bg-green-100 text-green-700' : 
                                            d.status === 'Refusé' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 flex justify-center gap-2">
                                        <button 
                                            onClick={() => updateStatus(d.id, "Validé")} 
                                            disabled={isProcessed}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                                isProcessed 
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                                : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
                                            }`}
                                        >
                                            Valider
                                        </button>
                                        <button 
                                            onClick={() => updateStatus(d.id, "Refusé")} 
                                            disabled={isProcessed}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                                isProcessed 
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                                : 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                                            }`}
                                        >
                                            Refuser
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};