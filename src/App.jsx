import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

//auth
const Login = React.lazy(() => import("./auth/Login"));
const Register = React.lazy(() => import("./auth/Register"));
const Forgot = React.lazy(() => import("./auth/Forgot"));

//components
const Loading = React.lazy(() => import("./components/Loading"));

//pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Users = React.lazy(() => import("./pages/User"));
const Artikel = React.lazy(() => import("./pages/Artikel"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Testimoni = React.lazy(() => import("./pages/Testimoni"));
const LowonganPekerjaan = React.lazy(() => import("./pages/LowonganPekerjaan"));
const MediaGaleri = React.lazy(() => import("./pages/MediaGallery"));
const Layanan = React.lazy(() => import("./pages/Layanan"));
      //reservasi
const Reservasi = React.lazy(() => import("./pages/Reservasi"));
const ReservasiDetail = React.lazy(() => import("./pages/ReservasiDetail"));
      //produk
const Produk = React.lazy(() => import("./pages/Produk"));
const ProdukDetail = React.lazy(() => import("./pages/ProdukDetail"));
const AddProduct = React.lazy(() => import("./pages/AddProduk"));
const EditProduct = React.lazy(() => import("./pages/EditProduct"));
      //profil Perusahaan
const Profil = React.lazy(() => import("./pages/ProfilPerusahaan"));
const ProfilTambah = React.lazy(() => import("./pages/ProfilTambah"));
const ProfilEdit = React.lazy(() => import("./pages/ProfilEdit"));
      //contactUs
const ContactUs = React.lazy(() => import("./pages/FormKontak"));
const ContactUsDetail = React.lazy(() => import("./pages/FormKontakDetail"));
      //Karyawan
const Karyawan = React.lazy(() => import("./pages/Karyawan"));
const KaryawanDetail = React.lazy(() => import("./pages/KaryawanDetail"));
const AddKaryawan = React.lazy(() => import("./pages/KaryawanForm"));

//layout
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const ErrorLayout = React.lazy(() => import("./layouts/ErrorLayout"));

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* {MAIN} */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Artikel" element={<Artikel />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/lowongan" element={<LowonganPekerjaan />} />
          <Route path="/galeri" element={<MediaGaleri />} />
          <Route path="/layanan" element={<Layanan />} />
            {/* {reservasi} */}
          <Route path="/reservasi" element={<Reservasi />} />
          <Route path="/reservasi/:id" element={<ReservasiDetail />} />
            {/* {produk} */}
          <Route path="/produk" element={<Produk />} />
          <Route path="/produk/:id" element={<ProdukDetail />} />
          <Route path="/produk/tambah" element={<AddProduct />} />
          <Route path="/produk/edit/:id" element={<EditProduct />} />
            {/* {profilPerusahaan} */}
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/tambah" element={<ProfilTambah />} />
          <Route path="/profil/edit/:id" element={<ProfilEdit />} />
            {/* {ContactUs} */}
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/contactUs/:id" element={<ContactUsDetail />} />
            {/* {Karyawan} */}
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/karyawan/:id" element={<KaryawanDetail />} />
          <Route path="/karyawan/tambah" element={<AddKaryawan />} />
        </Route>
        
        {/* {AUTH} */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* {ERROR} */}
        <Route element={<ErrorLayout />}>
          <Route
            path="/400"
            element={
              <ErrorPage
                code="400"
                message="Bad Request"
                image="./src/assets/error.png"
              />
            }
          />
          <Route
            path="/401"
            element={
              <ErrorPage
                code="401"
                message="Unauthorized"
                image="./src/assets/error.png"
              />
            }
          />
          <Route
            path="/403"
            element={
              <ErrorPage
                code="403"
                message="Forbidden"
                image="./src/assets/error.png"
              />
            }
          />
          <Route
            path="*"
            element={
              <ErrorPage
                code="404"
                message="Page Not Found"
                image="./src/assets/error.png"
              />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
