import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import axios from 'axios';

export const Dashboard = () => {
    const { instance, accounts } = useMsal();
    const [demandes, setDemandes] = useState([]);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await instance.acquireTokenSilent({
                    scopes: [import.meta.env.VITE_MSAL_SCOPE_API],
                    account: accounts[0]
                });

                const res = await axios.get('http://localhost:5067/api/Demande', {
                    headers: { Authorization: `Bearer ${response.accessToken}` }
                });
                setDemandes(res.data);
            } catch (e) { console.error(e); }
        };
        fetchDemandes();
    }, [instance, accounts]);

    return (
        <div>
            <h2>Mes Dossiers</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Objet</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {demandes.map((d) => (
                        <tr key={d.id}>
                            <td>{d.nom}</td>
                            <td>{d.prenom}</td>
                            <td>{d.objet}</td>
                            <td>{d.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};