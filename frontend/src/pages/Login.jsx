import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const Login = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error("Erreur de connexion :", e);
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.title}>Gestion de Dossiers</h1>
                <p style={styles.subtitle}>Connectez-vous pour accéder à votre espace sécurisé.</p>
                
                <button onClick={handleLogin} style={styles.button}>
                    <img 
                        src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_mssymbol_32.png" 
                        alt="Microsoft Logo" 
                        style={styles.icon}
                    />
                    Se connecter avec Microsoft
                </button>

                <p style={styles.footerText}>Authentification via Azure Entra ID</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f7'
    },
    loginBox: {
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
    },
    title: { fontSize: '24px', color: '#333', marginBottom: '10px' },
    subtitle: { color: '#666', marginBottom: '30px' },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '12px',
        backgroundColor: '#2F2F2F',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
    },
    icon: { marginRight: '10px', width: '20px' },
    footerText: { marginTop: '20px', fontSize: '12px', color: '#999' }
};