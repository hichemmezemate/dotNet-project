import { useState } from 'react';

export const DemandeForm = ({ onSumbit, loading }) => {
    const [sujet, setSujet] = useState("");

    return (
        <div className="card">
            <input 
                type="text" 
                value={sujet} 
                onChange={(e) => setSujet(e.target.value)} 
                placeholder="Sujet de la demande..."
            />
            <button onClick={() => onSumbit({ sujet })} disabled={loading}>
                {loading ? "Envoi..." : "Envoyer"}
            </button>
        </div>
    );
};