import { Outlet } from "react-router-dom";

export default function ErrorLayout() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl w-full">
                <Outlet />
            </div>
        </div>
    );
}
