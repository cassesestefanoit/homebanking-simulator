import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MySwal, alertConfig } from "../utils/alerts"; // Importamos la instancia global

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
}

interface User {
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  password: string;
  accountNumber: number;
  balance: number;
  transactions: Transaction[];
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export default function LoginForm({
  onSwitchToRegister,
  onLoginSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Recuperar lista de usuarios tipada
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      MySwal.fire({
        title: "Usuario no encontrado",
        text: "No hay usuarios registrados. Por favor, regístrate primero.",
        icon: "warning",
        ...alertConfig,
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    // Buscar usuario por email y password
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Guardar usuario activo
      localStorage.setItem("activeUserEmail", user.email);

      MySwal.fire({
        title: "Bienvenido 👋",
        text: `Inicio de sesión exitoso para ${user.nombre} ${user.apellido}`,
        icon: "success",
        ...alertConfig,
        confirmButtonColor: "#10b981",
      }).then(() => {
        onLoginSuccess();
      });
    } else {
      MySwal.fire({
        title: "Credenciales inválidas",
        text: "Email o contraseña incorrectos.",
        icon: "error",
        ...alertConfig,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-xl w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 text-center tracking-wide">
          WalletIT
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
          Iniciar Sesión
        </h2>

        {/* Campo Email */}
        <div className="mb-6">
          <label className="block text-lg md:text-xl text-gray-300 mb-3">Email</label>
          <div className="flex items-center bg-[#1A1A1D] border border-gray-700 rounded-lg px-4 py-3">
            <FaUser className="text-gray-400 mr-3 text-xl" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-lg bg-transparent text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div className="mb-8">
          <label className="block text-lg md:text-xl text-gray-300 mb-3">Contraseña</label>
          <div className="flex items-center bg-[#1A1A1D] border border-gray-700 rounded-lg px-4 py-3">
            <FaLock className="text-gray-400 mr-3 text-xl" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-lg bg-transparent text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg md:text-xl py-3 md:py-4 rounded-lg hover:opacity-90 transition"
        >
          Ingresar
        </button>

        <p className="text-gray-400 text-sm md:text-base mt-6 text-center">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-pink-400 hover:underline font-semibold"
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  );
}

