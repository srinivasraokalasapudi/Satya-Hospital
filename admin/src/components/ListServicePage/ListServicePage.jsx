import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Save, X, Pencil, Star, AlertTriangle } from "lucide-react";
import api from "../../utils/api";
import AddService from "../AddService/AddService";
import { formatCurrency } from "../../utils/format";

export default function ListServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  async function fetchServices() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/services");
      setServices(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not load services.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) => s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q),
    );
  }, [services, search]);

  function startEdit(svc) {
    setEditingId(svc._id);
    setEditForm({
      price: svc.price,
      availability: svc.availability,
      category: svc.category,
      duration: svc.duration,
    });
  }

  async function saveEdit(id) {
    try {
      const res = await api.put(`/services/${id}`, {
        ...editForm,
        price: Number(editForm.price) || 0,
      });
      setServices((old) => old.map((s) => (s._id === id ? res.data : s)));
      setEditingId(null);
    } catch (err) {
      alert(err?.response?.data?.error || "Could not update service.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/services/${id}`);
      setServices((old) => old.filter((s) => s._id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || "Could not delete service.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen font-serif bg-emerald-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-emerald-800">Services</h1>
            <p className="text-xs sm:text-sm text-emerald-600">{services.length} service(s) offered</p>
          </div>
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm w-full sm:w-72">
            <Search size={16} className="text-emerald-400" />
            <input
              className="ml-3 w-full outline-none text-emerald-700 placeholder-emerald-400 bg-transparent text-sm"
              placeholder="Search by name or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <AddService onAdded={(svc) => setServices((old) => [svc, ...old])} />

        {error && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-4 text-sm">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center text-emerald-600 py-12 rounded-lg bg-white/60 border border-emerald-100">
            Loading services…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-emerald-600 py-12 rounded-lg bg-white/60 border border-emerald-100">
            No services found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => {
              const editing = editingId === s._id;
              return (
                <div
                  key={s._id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex flex-col gap-3 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={s.imageUrl || `https://picsum.photos/seed/${s._id}/150`}
                      alt={s.name}
                      className="h-14 w-14 rounded-xl object-cover border-2 border-emerald-100"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-emerald-900 truncate">{s.name}</p>
                      <p className="text-sm text-gray-500 truncate">{s.description}</p>
                    </div>
                  </div>

                  {editing ? (
                    <div className="space-y-2">
                      <input
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        value={editForm.category}
                        onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                        placeholder="Category"
                      />
                      <input
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        value={editForm.duration}
                        onChange={(e) => setEditForm((f) => ({ ...f, duration: e.target.value }))}
                        placeholder="Duration"
                      />
                      <input
                        className="w-full p-2 rounded-full border border-emerald-200 text-sm"
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
                        placeholder="Price"
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
                          onClick={() => saveEdit(s._id)}
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
                        <p className="font-medium">{s.category || "General"} • {s.duration}</p>
                        <p className="flex items-center gap-1">
                          <Star size={14} className="text-amber-400 fill-amber-400" /> {s.rating || 0}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-semibold text-emerald-800">{formatCurrency(s.price)}</span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            s.availability === "Available"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-rose-50 text-rose-600 border border-rose-100"
                          }`}
                        >
                          {s.availability}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => startEdit(s)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 text-sm hover:shadow-sm"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          disabled={deletingId === s._id}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-rose-50 text-rose-700 text-sm hover:scale-[1.02] transition disabled:opacity-60"
                        >
                          <Trash2 size={14} /> {deletingId === s._id ? "Deleting…" : "Delete"}
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
