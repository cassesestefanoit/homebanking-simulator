import { useState } from "react";
import { FaWallet, FaArrowCircleDown, FaArrowCircleUp, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { MySwal, alertConfig } from "../utils/alerts";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
}

interface User {
  nombre: string;
  apellido: string;
  email: string;
  accountNumber: number;
  balance: number;
  transactions: Transaction[];
}

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  // Inicializamos directamente el usuario activo desde localStorage
  const [user, setUser] = useState<User | null>(() => {
    const activeEmail = localStorage.getItem("activeUserEmail");
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((u) => u.email === activeEmail) || null;
  });

  const [amount, setAmount] = useState<string>("");

  const updateUserData = (updatedUser: User) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(updatedUser);
  };

  const handleTransaction = (type: "deposit" | "withdraw") => {
    if (!user) return;

    const value = Number(amount);

    if (isNaN(value) || value <= 0) {
      MySwal.fire({
        title: "Monto inválido",
        text: "El monto debe ser un número positivo.",
        icon: "error",
        ...alertConfig,
      });
      return;
    }

    if (type === "withdraw" && value > user.balance) {
      MySwal.fire({
        title: "Saldo insuficiente",
        text: "No tienes fondos suficientes para el retiro.",
        icon: "warning",
        ...alertConfig,
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    const newBalance = type === "deposit" ? user.balance + value : user.balance - value;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: value,
      date: new Date().toLocaleString(),
    };

    const updatedUser: User = {
      ...user,
      balance: newBalance,
      transactions: [newTransaction, ...user.transactions],
    };

    updateUserData(updatedUser);
    setAmount("");

    MySwal.fire({
      title: type === "deposit" ? "Depósito exitoso" : "Retiro exitoso",
      text: `Se ha ${type === "deposit" ? "depositado" : "retirado"} $${value}.`,
      icon: "success",
      ...alertConfig,
      confirmButtonColor: "#10b981",
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white flex flex-col items-center p-4 md:p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-md md:max-w-2xl lg:max-w-4xl shadow-lg">
        {user && (
          <>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-center">
              Bienvenido {user.nombre} {user.apellido}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 text-center">
              Cuenta n° {user.accountNumber}
            </p>
          </>
        )}

        <p className="text-base md:text-lg lg:text-xl mb-6 text-center flex items-center justify-center gap-2">
          <FaWallet className="text-purple-400 text-2xl" /> Saldo actual: ${user?.balance ?? 0}
        </p>

        {/* Controles responsivos */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Monto"
            className="flex-1 px-3 py-2 rounded-lg bg-[#1A1A1D] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleTransaction("deposit")}
            className="w-full md:w-auto bg-linear-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <FaArrowCircleDown /> Depositar
          </button>
          <button
            onClick={() => handleTransaction("withdraw")}
            className="w-full md:w-auto bg-linear-to-r from-red-500 to-pink-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <FaArrowCircleUp /> Retirar
          </button>
        </div>

        <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
          <FaHistory /> Movimientos recientes
        </h3>
        <ul className="space-y-2 max-h-48 overflow-y-auto mb-6">
          {user?.transactions.map((t) => (
            <li
              key={t.id}
              className="flex flex-col md:flex-row justify-between bg-[#1A1A1D] px-3 py-2 rounded-lg"
            >
              <span className="text-sm md:text-base">
                {t.type === "deposit" ? "Depósito" : "Retiro"} - {t.date}
              </span>
              <span
                className={`text-sm md:text-base ${
                  t.type === "deposit" ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.type === "deposit" ? "+" : "-"}${t.amount}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onLogout}
          className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
