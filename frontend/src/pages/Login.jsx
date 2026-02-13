import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const Login = () => {
    const { instance } = useMsal();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20">
                <div className="text-center mb-10">
                    <div className="bg-slate-900 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-slate-200 mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Portail Dossiers</h1>
                    <p className="text-slate-500 mt-2 font-medium">Connectez-vous pour continuer</p>
                </div>

                <button 
                    onClick={() => instance.loginRedirect(loginRequest)}
                    className="group relative w-full flex items-center justify-center gap-4 bg-white text-slate-700 py-4 px-6 rounded-2xl border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 font-bold shadow-sm active:scale-[0.98]"
                >
                    <svg className="w-5 h-5" viewBox="0 0 23 23">
                        <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    Continuer avec Microsoft
                </button>

                <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="h-px w-16 bg-slate-200"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sécurisé par Azure AD</span>
                </div>
            </div>
        </div>
    );
};