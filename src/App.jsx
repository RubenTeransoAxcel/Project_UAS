import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Login = React.lazy(() => import("./auth/Login"));
const Register = React.lazy(() => import("./auth/Register"));
const Forgot = React.lazy(() => import("./auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Users = React.lazy(() => import("./pages/User"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Reservasi = React.lazy(() => import("./pages/Reservasi"));
const ReservasiDetail = React.lazy(() => import("./pages/ReservasiDetail"));
const Produk = React.lazy(() => import("./pages/Produk"));
const ProdukDetail = React.lazy(() => import("./pages/ProdukDetail"));
const AddProduct = React.lazy(() => import("./pages/AddProduk"));
const EditProduct = React.lazy(() => import("./pages/EditProduct"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Profil = React.lazy(() => import("./pages/ProfilPerusahaan"));
const ProfilTambah = React.lazy(() => import("./pages/ProfilTambah"));
const ProfilEdit = React.lazy(() => import("./pages/ProfilEdit"));
const Testimoni = React.lazy(() => import("./pages/Testimoni"));
const ContactUs = React.lazy(() => import("./pages/FormKontak"));
const ContactUsDetail = React.lazy(() => import("./pages/FormKontakDetail"));
const Karyawan = React.lazy(() => import("./pages/Karyawan"));
const KaryawanDetail = React.lazy(() => import("./pages/KaryawanDetail"));
const AddKaryawan = React.lazy(() => import("./pages/KaryawanForm"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const ErrorLayout = React.lazy(() => import("./layouts/ErrorLayout"));

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reservasi" element={<Reservasi />} />
          <Route path="/reservasi/:id" element={<ReservasiDetail />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/produk/:id" element={<ProdukDetail />} />
          <Route path="/produk/tambah" element={<AddProduct />} />
          <Route path="/produk/edit/:id" element={<EditProduct />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/tambah" element={<ProfilTambah />} />
          <Route path="/profil/edit/:id" element={<ProfilEdit />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/contactUs/:id" element={<ContactUsDetail />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/karyawan/:id" element={<KaryawanDetail />} />
          <Route path="/karyawan/tambah" element={<AddKaryawan />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

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
