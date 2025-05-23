// import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "../layouts/Sidebar";
// import Header from "../layouts/Header";

// export default function AppLayout() {
//   const location = useLocation();

//   // Cek apakah sedang berada di halaman tambah karyawan
//   const hideHeader = location.pathname === "/karyawan/tambah";

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         {!hideHeader && <Header />}
//         <Outlet />
//       </div>
//     </div>
//   );
// }
