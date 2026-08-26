import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Save, X, Pencil, Star, AlertTriangle } from "lucide-react";
import api from "../../utils/api";
import AddPage from "../AddPage/AddPage";
import { formatCurrency } from "../../utils/format";

export default function ListPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  async function fetchDoctors() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not load doctors.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (d) =>
        d.name?.toLowerCase().includes(q) ||
        d.specialization?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q),
    );
  }, [doctors, search]);

  function startEdit(doc) {
    setEditingId(doc._id);
    setEditForm({
      fee: doc.fee,
      availability: doc.availability,
      specialization: doc.specialization,
      phone: doc.phone,
    });
  }

  async function saveEdit(id) {
    try {
      const res = await api.put(`/doctors/${id}`, {
        ...editForm,
        fee: Number(editForm.fee) || 0,
      });
      setDoctors((old) => old.map((d) => (d._id === id ? res.data : d)));
      setEditingId(null);
    } catch (err) {
      alert(err?.response?.data?.error || "Could not update doctor.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this doctor? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/doctors/${id}`);
      setDoctors((old) => old.filter((d) => d._id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || "Could not delete doctor.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen font-serif bg-emerald-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-emerald-800">Doctors</h1>
            <p className="text-xs sm:text-sm text-emerald-600">{doctors.length} doctor(s) registered</p>
          </div>
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm w-full sm:w-72">
            <Search size={16} className="text-emerald-400" />
            <input
              className="ml-3 w-full outline-none text-emerald-700 placeholder-emerald-400 bg-transparent text-sm"
              placeholder="Search by name, specialization, email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <AddPage onAdded={(doc) => setDoctors((old) => [doc, ...old])} />

        {error && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-4 text-sm">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center text-emerald-600 py-12 rounded-lg bg-white/60 border border-emerald-100">
            Loading doctors…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-emerald-600 py-12 rounded-lg bg-white/60 border border-emerald-100">
            No doctors found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d) => {
              const editing = editingId === d._id;
              return (
                <div
                  key={d._id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex flex-col gap-3 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={d.imageUrl || `https://i.pravatar.cc/150?u=${d._id}`}
                      alt={d.name}
                      className="h-14 w-14 rounded-full object-cover border-2 border-emerald-100"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-emerald-900 truncate">{d.name}</p>
                      <p className="text-sm text-gray-500 truncate">{d.email}</p>
                    </div>
                  </div>

                  {editing ? (
                    <div className="space-y-2">
                      <input
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        value={editForm.specialization}
                        onChange={(e) => setEditForm((f) => ({ ...f, specialization: e.target.value }))}
                        placeholder="Specialization"
                      />
                      <input
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        value={editForm.phone}
                        onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="Phone"
                      />
                      <input
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        type="number"
                        value={editForm.fee}
                        onChange={(e) => setEditForm((f) => ({ ...f, fee: e.target.value }))}
                        placeholder="Fee"
                      />
                      <select
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        value={editForm.availability}
                        onChange={(e) => setEditForm((f) => ({ ...f, availability: e.target.value }))}
                      >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => saveEdit(d._id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-emerald-500 text-white text-sm"
                        >
                          <Save size={14} /> Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-gray-100 text-gray-700 text-sm"
                        >
                          <X size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-emerald-700 space-y-1">
                        <p>
                          <span className="font-medium">{d.specialization || "General"}</span>
                        </p>
                        <p className="text-gray-500">{d.phone}</p>
                        <p className="flex items-center gap-1">
                          <Star size={14} className="text-amber-400 fill-amber-400" /> {d.rating || 0}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-semibold text-emerald-800">{formatCurrency(d.fee)}</span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            d.availability === "Available"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-rose-50 text-rose-600 border border-rose-100"
                          }`}
                        >
                          {d.availability}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => startEdit(d)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 text-sm hover:shadow-sm"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d._id)}
                          disabled={deletingId === d._id}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-rose-50 text-rose-700 text-sm hover:scale-[1.02] transition disabled:opacity-60"
                        >
                          <Trash2 size={14} /> {deletingId === d._id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </>
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
