import React from 'react';
import { useMsal } from "@azure/msal-react";

export const Navbar = () => {
    const { instance, accounts } = useMsal();
    
    const name = accounts[0]?.name || accounts[0]?.username;

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>DeposeDossier</div>
            <div style={styles.userSection}>
                <span style={styles.userName}>Bonjour, <strong>{name}</strong></span>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0078d4',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    logo: { fontSize: '20px', fontWeight: 'bold' },
    userSection: { display: 'flex', alignItems: 'center', gap: '15px' },
    userName: { fontSize: '14px' },
    logoutButton: {
        padding: '6px 12px',
        backgroundColor: '#d83b01',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    }
};