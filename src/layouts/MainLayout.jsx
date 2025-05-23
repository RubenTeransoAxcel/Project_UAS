import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function App() {
  const hideHeader = location.pathname === "/karyawan/tambah";

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4">
          {!hideHeader && <Header />}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
