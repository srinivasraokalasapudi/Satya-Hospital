import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Calendar, Phone, ChevronDown, ChevronUp, AlertTriangle, RefreshCw } from "lucide-react";
import api from "../../utils/api";
import { formatDate, formatCurrency, statusClasses } from "../../utils/format";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

export default function ServiceAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  async function fetchAppointments() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/service-appointments");
      setAppointments(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not load service appointments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      return (
        a.patientname?.toLowerCase().includes(q) ||
        a.servicename?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.phone?.toLowerCase().includes(q)
      );
    });
  }, [appointments, search, statusFilter]);

  async function updateStatus(id, status) {
    setUpdatingId(id);
    try {
      const res = await api.put(`/service-appointments/${id}`, { status });
      setAppointments((old) => old.map((a) => (a._id === id ? res.data : a)));
    } catch (err) {
      alert(err?.response?.data?.error || "Could not update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this service appointment?")) return;
    try {
      await api.delete(`/service-appointments/${id}`);
      setAppointments((old) => old.filter((a) => a._id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || "Could not delete service appointment.");
    }
  }

  return (
    <div className="min-h-screen font-serif bg-emerald-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-emerald-800">Service Appointments</h1>
            <p className="text-xs sm:text-sm text-emerald-600">{filtered.length} of {appointments.length} shown</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm w-full sm:w-72">
              <Search size={16} className="text-emerald-400" />
              <input
                className="ml-3 w-full outline-none text-emerald-700 placeholder-emerald-400 bg-transparent text-sm"
                placeholder="Search patient, service, phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="text-sm px-3 py-2 rounded-full bg-emerald-100 shadow-sm outline-emerald-300 w-full sm:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={fetchAppointments}
              className="px-3 py-2 rounded-full bg-white border border-emerald-200 shadow-sm text-emerald-700 hover:shadow-md transition text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-4 text-sm">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center text-emerald-600 py-12 rounded-lg bg-white/60 border border-emerald-100">
            Loading service appointments…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-emerald-600 py-12 rounded-lg bg-white/60 border border-emerald-100">
            No service appointments found.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => {
              const expanded = expandedId === a._id;
              return (
                <div key={a._id} className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-emerald-900">{a.patientname} <span className="text-xs text-gray-400">({a.age || "-"}, {a.gender})</span></p>
                      <p className="text-sm text-emerald-600">{a.servicename} • {a.category}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(a.appointmentdate)} at {a.appointmenttime}</span>
                        <span className="flex items-center gap-1"><Phone size={12} /> {a.phone}</span>
                        <span className="font-medium text-emerald-700">{formatCurrency(a.price)}</span>
                        {a.isPaid && <span className="text-emerald-600 font-medium">Paid</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusClasses(a.status)}`}>{a.status}</span>
                      <select
                        className="text-sm px-3 py-1 rounded-full border border-emerald-300 bg-white cursor-pointer"
                        value={a.status}
                        disabled={updatingId === a._id}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDelete(a._id)}
                        className="p-2 rounded-full bg-rose-50 text-rose-600 hover:scale-105 transition"
                        aria-label="Delete service appointment"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => setExpandedId(expanded ? null : a._id)}
                        className="p-2 rounded-full bg-emerald-50 text-emerald-600"
                        aria-label="Toggle details"
                      >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                  {expanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-emerald-50 text-sm text-gray-700 space-y-2">
                      {a.aiBrief && (
                        <p className="bg-emerald-50 rounded-xl p-3">
                          <span className="font-medium text-emerald-800">AI Brief: </span>{a.aiBrief}
                        </p>
                      )}
                      {a.notes && <p><span className="font-medium text-emerald-800">Notes: </span>{a.notes}</p>}
                      <p className="text-xs text-gray-400">{a.email}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
