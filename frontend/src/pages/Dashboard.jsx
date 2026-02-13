import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import axios from 'axios';

export const Dashboard = () => {
    const { instance, accounts } = useMsal();
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                setLoading(true);
                const token = await instance.acquireTokenSilent({
                    scopes: [import.meta.env.VITE_MSAL_SCOPE_API],
                    account: accounts[0]
                });
                const res = await axios.get('http://localhost:5067/api/Demande', {
                    headers: { Authorization: `Bearer ${token.accessToken}` }
                });
                setDemandes(res.data);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchDemandes();
    }, [instance, accounts]);

    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                        <div className="h-3 w-32 bg-slate-100 rounded"></div>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6 space-y-2">
                <div className="h-4 w-48 bg-slate-200 rounded"></div>
                <div className="h-3 w-64 bg-slate-100 rounded"></div>
            </td>
            <td className="px-8 py-6">
                <div className="h-6 w-20 bg-amber-50 rounded-lg"></div>
            </td>
        </tr>
    );

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Vos Demandes</h1>
                    <p className="text-slate-500 font-medium mt-1">Gérez et suivez l'état de vos dossiers déposés</p>
                </div>
                <div className="bg-white p-1 rounded-xl shadow-inner border border-slate-200">
                    <span className="px-4 py-2 text-sm font-bold text-brand">
                        {loading ? "..." : `Total: ${demandes.length}`}
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Candidat</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Objet / Description</th>
                            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                        ) : demandes.length > 0 ? (
                            demandes.map((d) => (
                                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 ring-2 ring-white">
                                                {d.nom[0]}{d.prenom[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 tracking-tight">{d.nom} {d.prenom}</div>
                                                <div className="text-sm text-slate-400 font-medium">{d.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-semibold text-slate-700">{d.objet}</div>
                                        <div className="text-sm text-slate-400 line-clamp-1 italic">"{d.description}"</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ring-1 uppercase tracking-tighter ${
                                            d.status === "Validé" 
                                            ? "bg-emerald-100 text-emerald-700 ring-emerald-200" 
                                            : "bg-amber-100 text-amber-700 ring-amber-200"
                                        }`}>
                                            {d.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-8 py-20 text-center">
                                    <div className="text-slate-400 font-medium">Aucun dossier trouvé.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};