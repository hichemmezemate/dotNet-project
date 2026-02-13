import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../authConfig";
import axios from 'axios';

export const FormPage = () => {
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        objet: "", 
        description: "",
        email: accounts[0]?.username 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: ["api://989c8d02-0e75-475c-99d0-3e06fef4dc6b/access_as_user"],
                account: accounts[0]
            });

            await axios.post('http://localhost:5067/api/Demande', form, {
                headers: { 
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("Dossier déposé");
            navigate("/"); 
        } catch (err) {
            console.error("Erreur d'envoi", err);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Nouveau Dossier</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Nom" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                <input type="text" placeholder="Prénom" value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} required />
                <input type="text" placeholder="Objet" value={form.objet} onChange={e => setForm({...form, objet: e.target.value})} required />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Envoyer au service
                </button>
            </form>
        </div>
    );
};