import { createRoot } from 'react-dom/client'
import './tailwind.css'
// import "./custom.css"
import ProductList from './ListProdukJual'

createRoot(document.getElementById("root"))
    .render(
        <div>
            <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
            <h1 className="text-lg font-bold">Admin</h1>
            <ul className="flex space-x-4">
                <li><a href="dashboard.html">Home</a></li>
                <li><a href="reservasi">Reservasi</a></li>
                <li><a href="listproduk">Produk</a></li>
                <li><a href="faq">FAQ</a></li>
            </ul>
            <button className="border-2 bg-blue-500 border-blue-500 rounded px-2 py-1 text-lg font-bold">LogOut</button>
        </nav>
            <ProductList/>
        </div>
    )
