import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App() {
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");

  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F12]" >
      {/* Contenido principal */}
      <main className="flex-grow flex flex-col">
        {view === "login" && (
          <LoginForm
            onSwitchToRegister={() => setView("register")}
            onLoginSuccess={() => setView("dashboard")}
          />
        )}

        {view === "register" && (
          <RegisterForm onSwitchToLogin={() => setView("login")} />
        )}

        {view === "dashboard" && <Dashboard onLogout={() => setView("login")} />}
      </main>

      {/* Footer fijo al fondo */}
      <Footer />
    </div>
  );
}

export default App;

