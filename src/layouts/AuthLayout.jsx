import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-white to-[#5C332D]">
            <div className="bg-gradient-to-tr from-[#5C332D] to-black p-8 rounded-2xl shadow-md w-full max-w-md">
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
