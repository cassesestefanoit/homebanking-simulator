import { useState } from "react";
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

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof edad === "string" || edad < 18 || edad > 120) {
      MySwal.fire({
        title: "Edad inválida",
        text: "Debes ser mayor de 18 años y menor de 120.",
        icon: "error",
        ...alertConfig,
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (!regex.test(password)) {
      MySwal.fire({
        title: "Contraseña insegura",
        text: "Debe tener al menos una mayúscula y un número.",
        icon: "warning",
        ...alertConfig,
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const accountNumber = Math.floor(10000000 + Math.random() * 90000000);

    const user: User = {
      nombre,
      apellido,
      edad: Number(edad),
      email,
      password,
      accountNumber,
      balance: 0,
      transactions: [],
    };

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar si el email ya existe
    const exists = users.some((u) => u.email === email);
    if (exists) {
      MySwal.fire({
        title: "Email ya registrado",
        text: "Ese correo ya está en uso. Por favor inicia sesión o usa otro email.",
        icon: "error",
        ...alertConfig,
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    MySwal.fire({
      title: "Registro exitoso 🎉",
      text: `Tu número de cuenta es ${accountNumber}. Ahora puedes iniciar sesión.`,
      icon: "success",
      ...alertConfig,
      confirmButtonColor: "#10b981",
    }).then(() => {
      onSwitchToLogin();
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
          Registro Obligatorio
        </h2>

        {/* Campos de registro */}
        <div className="mb-4">
          <label className="block text-sm md:text-base text-gray-300 mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1A1D] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm md:text-base text-gray-300 mb-2">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1A1D] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm md:text-base text-gray-300 mb-2">Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1A1D] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm md:text-base text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1A1D] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm md:text-base text-gray-300 mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1A1D] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 md:py-3 rounded-lg hover:opacity-90 transition"
        >
          Crear Cuenta
        </button>

        <p className="text-gray-400 text-xs md:text-sm mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-pink-400 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </div>
  );
}
