import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, ShieldAlert, Stethoscope } from "lucide-react";
import { checkAdminCredentials, setAdminSession } from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }

    if (checkAdminCredentials(email, password)) {
      setAdminSession({ email: email.trim().toLowerCase(), loginAt: Date.now() });
      navigate("/", { replace: true });
    } else {
      setError("Invalid admin email or password.");
    }
  }

  return (
    <div className="min-h-screen font-serif flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-2xl rounded-3xl p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 bg-emerald-500 rounded-full shadow-lg mb-3">
            <Stethoscope className="text-white" size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Satya-Hospitals Admin
          </h1>
          <p className="text-sm text-emerald-600 mt-1">Sign in to manage the hospital dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@satya-hospitals.com"
              autoComplete="username"
              className="p-3 rounded-full border-2 border-emerald-100 bg-white placeholder:text-gray-400 shadow-sm w-full focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="p-3 pr-12 rounded-full border-2 border-emerald-100 bg-white placeholder:text-gray-400 shadow-sm w-full focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-emerald-600 hover:bg-emerald-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm">
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold shadow-xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-95 transition"
          >
            <LogIn size={18} />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
