import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black to-[#5C332D]">
            <div className="bg-gradient-to-b from-black to-[#5C332D] p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-poppins font-extrabold text-white">
                        <span className="text-white">Vamos Barber</span>
                    </h1>
                </div>

                <Outlet/>

            </div>
        </div>
    )
}
