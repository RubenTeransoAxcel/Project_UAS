import { MdPriceChange } from "react-icons/md"; 
import { MdPermMedia } from "react-icons/md"; 
import { FaHireAHelper } from "react-icons/fa"; 
import { MdArticle } from "react-icons/md"; 
import { MdCorporateFare } from "react-icons/md"; 
import { FaUser } from "react-icons/fa"; 
import { SiGooglemessages } from "react-icons/si"; 
import { IoMdChatbubbles } from "react-icons/io"; 
import { RiTeamFill } from "react-icons/ri"; 
import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaClipboardList, FaQuestionCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function ListMenu() {
  // Class untuk menu normal
  const menuClass = ({ isActive }) =>
    `flex items-center p-2 rounded-lg space-x-2 transition ${
      isActive
        ? "bg-white text-[#5C332D] font-bold"
        : "text-white hover:bg-white hover:text-[#5C332D] hover:font-bold hover:-translate-y-1 transition-all duration-300"
    }`;

  // Class untuk menu error
  const errorMenuClass = ({ isActive }) =>
    `flex items-center p-2 rounded-lg space-x-2 transition ${
      isActive
        ? "bg-red-100 text-red-700 font-bold"
        : "text-white hover:bg-red-200 hover:text-red-700 hover:font-bold hover:-translate-y-1 transition-all duration-300"
    }`;

  return (
    <div id="sidebar-menu" className="px-5 mt-2 space-y-2">
      <ul id="menu-list" className="space-y-1">
        <li>
          <NavLink to="/" className={menuClass}>
            <FaHome className="mr-4 text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={menuClass}>
            <FaUser className="mr-4 text-xl"/>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/artikel" className={menuClass}>
            <MdArticle className="mr-4 text-xl"/>
            Artikel
          </NavLink>
        </li>
        <li>
          <NavLink to="/galeri" className={menuClass}>
            <MdPermMedia className="mr-4 text-xl"/>
            Media Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/produk" className={menuClass}>
            <FaBox className="mr-4 text-xl" />
            Produk
          </NavLink>
        </li>
        <li>
          <NavLink to="/layanan" className={menuClass}>
            <MdPriceChange className="mr-4 text-2xl" />
            Layanan
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservasi" className={menuClass}>
            <FaClipboardList className="mr-4 text-xl" />
            Reservasi
          </NavLink>
        </li>
        <li>
          <NavLink to="/testimoni" className={menuClass}>
            <IoMdChatbubbles className="mr-4 text-xl"/>
            Testimoni
          </NavLink>
        </li>
        <li>
          <NavLink to="/contactUs" className={menuClass}>
            <SiGooglemessages className="mr-4 text-2xl"/>
            Form Kontak
          </NavLink>
        </li>
        <li>
          <NavLink to="/karyawan" className={menuClass}>
            <RiTeamFill className="mr-4 text-xl" />
            Tim/Karyawan
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" className={menuClass}>
            <FaQuestionCircle className="mr-4 text-xl" />
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink to="/profil" className={menuClass}>
            <MdCorporateFare className="mr-4 text-xl"/>
            Profil Perusahaan
          </NavLink>
        </li>
        <li>
          <NavLink to="/lowongan" className={menuClass}>
            <FaHireAHelper className="mr-4 text-xl"/>
            Lowongan Pekerjaan
          </NavLink>
        </li>
      </ul>

      {/* Error Pages */}
      <hr className="border-gray-400/30 my-2" />
      <ul className="space-y-1">
        <li>
          <NavLink to="/400" className={errorMenuClass}>
            <MdErrorOutline className="mr-4 text-xl" />
            Error 400
          </NavLink>
        </li>
        <li>
          <NavLink to="/401" className={errorMenuClass}>
            <MdErrorOutline className="mr-4 text-xl" />
            Error 401
          </NavLink>
        </li>
        <li>
          <NavLink to="/403" className={errorMenuClass}>
            <MdErrorOutline className="mr-4 text-xl" />
            Error 403
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
