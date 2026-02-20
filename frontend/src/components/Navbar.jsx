import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import axios from "axios";

export const Navbar = () => {
    const { instance, accounts } = useMsal();
    const location = useLocation();
    const navigate = useNavigate();

    const isAdminRoute = location.pathname.startsWith("/admin");

    const handleLogout = async () => {
        if (isAdminRoute) {
            try {
                await axios.post('http://localhost:5067/api/AdminAuth/logout', {}, { withCredentials: true });
                navigate('/admin-login');
            } catch (error) {
                navigate('/admin-login');
            }
        } else {
            instance.logoutRedirect();
        }
    };

    const linkStyle = (path) => location.pathname === path 
        ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100";

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
                
                <div className="flex-shrink-0">
                    <Link to={isAdminRoute ? "/admin" : "/"} className="text-xl tracking-tight text-slate-900">
                        <span className="font-bold">Gestion</span>
                        <span className="font-light text-slate-500">Dossier</span>
                    </Link>
                </div>

                <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
                    {isAdminRoute ? (
                        <Link to="/admin" className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${linkStyle("/admin")}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Console Administration
                        </Link>
                    ) : (
                        <>
                            <Link to="/" className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${linkStyle("/")}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Dashboard
                            </Link>
                            <Link to="/nouveau" className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${linkStyle("/nouveau")}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                                Nouvelle Demande
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-5">
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-sm font-bold text-slate-800 leading-none">
                            {isAdminRoute ? "Administrateur" : accounts[0]?.name}
                        </span>
                        
                        {isAdminRoute ? (
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">Accès Privilégié</span>
                        ) : (
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Vérifié</span>
                        )}
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    );
};