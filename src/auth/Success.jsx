import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-[#5C332D]">Berhasil 🎉</h2>
        <p className="text-gray-600 text-sm">
          We've sent a reset link to your email. Please check your inbox and
          follow the instructions.
        </p>

        <Button onClick={() => navigate("/")} className="mt-4">
          Back to Login
        </Button>
      </div>
    </div>
  );
}
