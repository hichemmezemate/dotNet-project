import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { FormPage } from './pages/FormPage';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function App() {
  return (
    <div className="h-screen w-full bg-slate-50"> 
      <Routes>
        <Route path="/" element={
          <>
            <AuthenticatedTemplate>
              <Navbar />
              <div className="p-4"><Dashboard /></div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <Login />
            </UnauthenticatedTemplate>
          </>
        } />
        
        <Route path="/nouveau" element={
          <AuthenticatedTemplate>
            <Navbar />
            <div className="p-4"><FormPage /></div>
          </AuthenticatedTemplate>
        } />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <div className="h-full">
            <Navbar />
            <AdminDashboard />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;