import { useState } from "react";
import { Plus, CheckCircle, XCircle, FlaskConical, ChevronDown, ChevronUp } from "lucide-react";
import api from "../../utils/api";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  duration: "1 hour",
  imageUrl: "",
  availability: "Available",
  rating: "",
};

export default function AddService({ onAdded }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  function showToast(type, message) {
    setToast({ show: true, type, message });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  }

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    return form.name.trim() && form.description.trim() && String(form.price).trim();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      showToast("error", "Please fill in name, description and price.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        rating: form.rating === "" ? 0 : Number(form.rating),
      };
      const res = await api.post("/services", payload);
      showToast("success", "Service added successfully!");
      setForm(emptyForm);
      onAdded?.(res.data);
    } catch (err) {
      showToast("error", err?.response?.data?.error || "Could not add service.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "p-3 rounded-full border-2 border-emerald-100 bg-white placeholder:text-gray-400 shadow-sm w-full focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all";
  const textareaClass =
    "p-3 rounded-xl border-2 border-emerald-100 bg-white placeholder:text-gray-400 shadow-sm w-full focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all";

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-xl rounded-3xl mb-6 relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-5"
      >
        <span className="flex items-center gap-3 text-lg font-semibold text-emerald-800">
          <span className="p-2 bg-emerald-500 rounded-full text-white">
            <FlaskConical size={18} />
          </span>
          Add New Service
        </span>
        {open ? <ChevronUp className="text-emerald-600" /> : <ChevronDown className="text-emerald-600" />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className={inputClass} placeholder="Service Name *" value={form.name} onChange={(e) => update("name", e.target.value)} />
          <input className={inputClass} placeholder="Category (e.g. Diagnostic)" value={form.category} onChange={(e) => update("category", e.target.value)} />
          <input className={inputClass} type="number" min={0} placeholder="Price (₹) *" value={form.price} onChange={(e) => update("price", e.target.value)} />
          <input className={inputClass} placeholder="Duration (e.g. 1 hour)" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
          <input className={inputClass} placeholder="Image URL" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} />
          <input
            className={inputClass}
            type="number"
            min={0}
            max={5}
            step={0.1}
            placeholder="Rating (0 - 5)"
            value={form.rating}
            onChange={(e) => update("rating", e.target.value)}
          />
          <select className={inputClass} value={form.availability} onChange={(e) => update("availability", e.target.value)}>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <textarea
            className={textareaClass + " md:col-span-2"}
            placeholder="Description *"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />

          <div className="md:col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3.5 rounded-full font-semibold shadow-xl w-full md:w-auto flex items-center justify-center gap-2 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              } bg-linear-to-r from-emerald-500 to-cyan-500 text-white`}
            >
              <Plus size={18} />
              {loading ? "Adding…" : "Add Service"}
            </button>
          </div>
        </form>
      )}

      {toast.show && (
        <div
          className={`fixed top-6 right-3 left-3 sm:right-6 sm:left-auto z-50 p-4 rounded-xl shadow-xl flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-rose-50 border border-rose-200 text-rose-700"
          }`}
        >
          {toast.type === "success" ? <CheckCircle size={22} /> : <XCircle size={22} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
