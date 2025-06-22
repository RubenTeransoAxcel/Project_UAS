// Sidebar.jsx
import ListMenu from "./ListMenu";
import logo from "../assets/logo (2).png";

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-64 flex-col bg-[#1E1E1E] text-white justify-between">
      {/* Logo dan Menu */}
      <div>
        {/* Logo */}
        <div className="p-5">
          <center><img src={logo} alt="Logo" className="h-20 w-auto object-contain" /></center>
          <h1 className="text-2xl font-bold">Vamos Barbershop</h1>
          <p className="text-gray-300 text-sm mt-1">-Admin-</p>
        </div>

        {/* Menu navigasi */}
        <ListMenu />
      </div>

      {/* Footer */}
      <div className="p-5 text-xs text-gray-300 border-t border-gray-400/50">
        <p>Barbershop Admin Home</p>
        <div className="flex items-center gap-2 mt-2 text-gray-400">
          <span>Made by Ruben Teranso Axcel</span>
        </div>
      </div>
    </div>
  );
}
