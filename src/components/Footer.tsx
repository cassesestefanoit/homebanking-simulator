export default function Footer() {
  return (
    <footer className="w-full bg-[#0F0F12] text-gray-400 py-4 px-6 mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2 md:gap-0">
        <p className="text-xs md:text-sm">
          © 2026 CasseseStefano.IT - Todos los derechos reservados
        </p>
        <p className="text-xs md:text-sm">
          Contacto: <span className="text-pink-400">cassese.stefano.it</span>
        </p>
      </div>
    </footer>
  );
}
