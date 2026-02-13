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