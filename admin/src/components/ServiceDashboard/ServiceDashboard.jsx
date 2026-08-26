import { useEffect, useMemo, useState } from "react";
import { Wallet, CreditCard, Banknote, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import api from "../../utils/api";
import { formatCurrency, statusClasses } from "../../utils/format";

function PaymentRow({ p, onMarkCollected, marking }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-3 items-center px-4 py-3 bg-white rounded-xl border border-emerald-50 hover:shadow-sm transition text-sm">
      <div className="sm:col-span-2">
        <p className="font-medium text-emerald-900">{p.patientEmail}</p>
        <p className="text-xs text-gray-500">{p.patientPhone}</p>
      </div>
      <div className="text-gray-600 truncate" title={p.description}>{p.description}</div>
      <div className="font-semibold text-emerald-800">{formatCurrency(p.amount)}</div>
      <div className="flex items-center gap-1 text-xs text-gray-600">
        {p.paymentMethod === "cash" ? <Banknote size={14} /> : <CreditCard size={14} />}
        {p.paymentMethod || "-"}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs px-3 py-1 rounded-full ${statusClasses(p.status)}`}>{p.status}</span>
        {p.paymentMethod === "cash" && p.status === "pending" && (
          <button
            onClick={() => onMarkCollected(p.paymentId)}
            disabled={marking === p.paymentId}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs disabled:opacity-60"
          >
            <CheckCircle2 size={14} />
            {marking === p.paymentId ? "Saving…" : "Mark Received"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ServiceDashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(null);

  async function fetchPayments() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/payments/all");
      setPayments(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not load payments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  const doctorPayments = useMemo(() => payments.filter((p) => p.appointmentId), [payments]);
  const servicePayments = useMemo(() => payments.filter((p) => p.serviceAppointmentId), [payments]);

  const totalCollected = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const totalPendingCash = payments
    .filter((p) => p.paymentMethod === "cash" && p.status === "pending")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  async function handleMarkCollected(paymentId) {
    setMarking(paymentId);
    try {
      const res = await api.post(`/payments/mark-collected/${paymentId}`);
      setPayments((old) => old.map((p) => (p.paymentId === paymentId ? res.data.payment : p)));
    } catch (err) {
      alert(err?.response?.data?.error || "Could not mark payment as collected.");
    } finally {
      setMarking(null);
    }
  }

  return (
    <div className="min-h-screen font-serif p-4 sm:p-6 bg-linear-to-b from-emerald-50 via-emerald-25 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-800">Payments</h1>
            <p className="text-sm text-gray-600">Doctor consultations & service bookings</p>
          </div>
          <button
            onClick={fetchPayments}
            className="px-3 py-2 rounded-full bg-white border border-emerald-200 shadow-sm text-emerald-700 hover:shadow-md transition text-sm flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 shadow-sm border border-green-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Collected</p>
              <p className="text-lg font-semibold text-slate-800">{formatCurrency(totalCollected)}</p>
            </div>
          </div>
          <div className="rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 shadow-sm border border-green-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Banknote size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Cash</p>
              <p className="text-lg font-semibold text-slate-800">{formatCurrency(totalPendingCash)}</p>
            </div>
          </div>
          <div className="rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 shadow-sm border border-green-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Records</p>
              <p className="text-lg font-semibold text-slate-800">{payments.length}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-4 text-sm">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-emerald-100">Loading payments…</div>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3">Doctors Payment</h2>
              {doctorPayments.length === 0 ? (
                <div className="text-center text-gray-500 py-8 bg-white rounded-2xl border border-emerald-100">No doctor payments yet.</div>
              ) : (
                <div className="space-y-2">
                  {doctorPayments.map((p) => (
                    <PaymentRow key={p._id} p={p} onMarkCollected={handleMarkCollected} marking={marking} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold text-emerald-800 mb-3">Services Payment</h2>
              {servicePayments.length === 0 ? (
                <div className="text-center text-gray-500 py-8 bg-white rounded-2xl border border-emerald-100">No service payments yet.</div>
              ) : (
                <div className="space-y-2">
                  {servicePayments.map((p) => (
                    <PaymentRow key={p._id} p={p} onMarkCollected={handleMarkCollected} marking={marking} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
