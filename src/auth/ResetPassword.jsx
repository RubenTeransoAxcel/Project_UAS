import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password has been reset successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Reset Your Password 🔒
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm mb-1 block">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm mb-1 block">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
