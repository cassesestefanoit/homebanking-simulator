import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);

// Configuración base opcional
export const alertConfig = {
  confirmButtonColor: "#a855f7", // morado Tailwind
  background: "#0F0F12",         // fondo oscuro
  color: "#fff",                 // texto blanco
};
