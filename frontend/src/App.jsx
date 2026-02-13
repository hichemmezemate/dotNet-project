import { Routes, Route, Link } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Dashboard } from "./pages/Dashboard";
import { FormPage } from "./pages/FormPage";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <Navbar />
        <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
            <Link to="/">Dashboard</Link> | <Link to="/nouveau">Nouvelle Demande</Link>
        </nav>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nouveau" element={<FormPage />} />
          </Routes>
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;