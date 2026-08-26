import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  FlaskConical,
  ClipboardList,
  Wallet,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { clearAdminSession, useAdminSession } from "../../utils/auth";
import logo from "../../assets/logo.png";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/appointments", label: "Appointments", icon: CalendarCheck },
  { to: "/services", label: "Services", icon: FlaskConical },
  { to: "/service-appointments", label: "Service Appointments", icon: ClipboardList },
  { to: "/payments", label: "Payments", icon: Wallet },
];

export default function Navbar() {
  const navigate = useNavigate();
  const admin = useAdminSession();
  const [open, setOpen] = useState(false);

  function handleSignOut() {
    clearAdminSession();
    navigate("/login", { replace: true });
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
      isActive
        ? "bg-emerald-500 text-white shadow"
        : "text-emerald-700 hover:bg-emerald-50"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Satya-Hospitals" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="font-bold text-emerald-800 leading-none">Satya-Hospitals</p>
            <p className="text-xs text-emerald-500">Admin Dashboard</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="text-sm text-emerald-700">
            Hi, <span className="font-semibold">{admin?.email || "admin"}</span>
          </span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium shadow hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <button
          className="lg:hidden p-2 rounded-full text-emerald-700 hover:bg-emerald-50"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-emerald-100 px-4 py-3 flex flex-col gap-1 bg-white">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-emerald-100">
            <span className="text-sm text-emerald-700">
              Hi, <span className="font-semibold">{admin?.email || "admin"}</span>
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium shadow flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
