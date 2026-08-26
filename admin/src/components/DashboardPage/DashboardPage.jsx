import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  FlaskConical,
  CalendarCheck,
  ClipboardList,
  Wallet,
  Clock,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import api from "../../utils/api";
import { formatCurrency, formatDateTime, statusClasses } from "../../utils/format";

function StatCard({ icon: Icon, label, value, to }) {
  const content = (
    <div className="p-4 rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 shadow-sm border border-green-100 flex items-center gap-3 hover:shadow-md transition">
      <div className="p-2 bg-white/80 rounded-full shadow-inner">
        <Icon className="text-emerald-600" size={22} />
      </div>
      <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="text-xl font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    doctors: [],
    appointments: [],
    services: [],
    serviceAppointments: [],
    payments: [],
  });

  async function fetchAll() {
    setLoading(true);
    setError("");
    try {
      const [doctors, appointments, services, serviceAppointments, payments] =
        await Promise.all([
          api.get("/doctors"),
          api.get("/appointments"),
          api.get("/services"),
          api.get("/service-appointments"),
          api.get("/payments/all"),
        ]);
      setData({
        doctors: doctors.data || [],
        appointments: appointments.data || [],
        services: services.data || [],
        serviceAppointments: serviceAppointments.data || [],
        payments: payments.data || [],
      });
    } catch (err) {
      setError(err?.response?.data?.error || "Could not load dashboard data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const totalEarnings = data.payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const pendingAppointments =
    data.appointments.filter((a) => a.status === "pending").length +
    data.serviceAppointments.filter((a) => a.status === "pending").length;

  const recentAppointments = [...data.appointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="min-h-screen font-serif p-4 sm:p-6 bg-linear-to-br from-green-50 via-green-100 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">Overview of hospital activity</p>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm text-emerald-700 hover:shadow-md transition text-sm"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon={Stethoscope} label="Doctors" value={data.doctors.length} to="/doctors" />
          <StatCard icon={FlaskConical} label="Services" value={data.services.length} to="/services" />
          <StatCard icon={CalendarCheck} label="Doctor Appointments" value={data.appointments.length} to="/appointments" />
          <StatCard icon={ClipboardList} label="Service Appointments" value={data.serviceAppointments.length} to="/service-appointments" />
          <StatCard icon={Wallet} label="Total Collected" value={formatCurrency(totalEarnings)} to="/payments" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-emerald-100">
            <p className="text-sm text-slate-600">Pending Appointments</p>
            <p className="text-2xl font-semibold text-yellow-600 mt-1">{pendingAppointments}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-emerald-100">
            <p className="text-sm text-slate-600">Completed Payments</p>
            <p className="text-2xl font-semibold text-emerald-700 mt-1">
              {data.payments.filter((p) => p.status === "completed").length}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-emerald-100">
            <p className="text-sm text-slate-600">Pending Cash Collections</p>
            <p className="text-2xl font-semibold text-rose-600 mt-1">
              {data.payments.filter((p) => p.paymentMethod === "cash" && p.status === "pending").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-50">
            <h2 className="text-lg font-semibold text-emerald-800">Recent Appointments</h2>
            <Link to="/appointments" className="text-sm text-emerald-600 hover:underline">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="px-5 py-10 text-center text-gray-500">Loading…</div>
          ) : recentAppointments.length === 0 ? (
            <div className="px-5 py-10 text-center text-gray-500">No appointments yet.</div>
          ) : (
            <div className="divide-y divide-emerald-50">
              {recentAppointments.map((a) => (
                <div key={a._id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-emerald-900">{a.patientname}</p>
                    <p className="text-sm text-gray-500">
                      with Dr. {a.doctorname} • {a.specialization}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={12} /> {formatDateTime(a.createdAt)}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full self-start sm:self-center ${statusClasses(a.status)}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
