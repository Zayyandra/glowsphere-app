import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        <span className="text-indigo-600">Dabang</span>
                        <span className="text-blue-500">.</span>
                    </h1>
                </div>

                <Outlet />

                <p className="text-center text-sm text-gray-400 mt-6">
                    © 2025 Dabang Admin. All rights reserved.
                </p>
            </div>
        </div>
    );
}
