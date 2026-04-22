# 🏦 Homebanking Simulator

Este proyecto es un simulador de homebanking desarrollado en **React + TypeScript**, con almacenamiento en **localStorage** y despliegue en **Netlify**.  
Permite registrar usuarios, iniciar sesión, realizar depósitos y retiros, y visualizar movimientos recientes de cada cuenta.

🌐 **Demo en línea:** [Homebanking Simulator en Netlify](https://69e8d345caf8c3516b31556f--starlit-croquembouche-35cab5.netlify.app/)

---

## 🚀 Funcionalidades principales
- Registro de usuarios con validación de edad (entre 18 y 120 años).
- Validación de contraseña (mínimo una mayúscula y un número).
- Inicio de sesión multiusuario con persistencia en `localStorage`.
- Dashboard personalizado con:
  - Saldo actual.
  - Movimientos recientes.
  - Depósitos y retiros con alertas estilizadas (SweetAlert2).
- Cierre de sesión seguro.
- Interfaz moderna con **TailwindCSS** y componentes responsivos.

---

## 🛠️ Tecnologías utilizadas
- **React + TypeScript**
- **TailwindCSS**
- **SweetAlert2**
- **localStorage** para persistencia de datos
- **Netlify** para despliegue

---

## 📦 Instalación y ejecución local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/cassesestefanoit/homebanking-simulator.git
   cd homebanking-simulator
2. Instalar dependencias:
   ```bash
   npm install
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   
4. Generar build de producción:
   ```bash
   npm run build

## 🌐 Despliegue en Netlify
El proyecto está desplegado automáticamente en Netlify.
Cada vez que se hace git push a GitHub, Netlify construye y publica la nueva versión.

Build command: npm run build

Publish directory: dist (si usás Vite) o build (si usás Create React App).





👨‍💻 Autor
Stefano Cassese
