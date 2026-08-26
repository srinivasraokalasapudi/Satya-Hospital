import { useState } from "react";
import { Plus, CheckCircle, XCircle, UserPlus, ChevronDown, ChevronUp } from "lucide-react";
import api from "../../utils/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  experience: "",
  qualifications: "",
  location: "",
  about: "",
  fee: "",
  rating: "",
  imageUrl: "",
  availability: "Available",
};

export default function AddPage({ onAdded }) {
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
    const required = ["name", "email", "phone", "specialization", "fee"];
    return required.every((k) => String(form[k] || "").trim() !== "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      showToast("error", "Please fill in name, email, phone, specialization and fee.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        fee: Number(form.fee) || 0,
        rating: form.rating === "" ? 0 : Number(form.rating),
      };
      const res = await api.post("/doctors", payload);
      showToast("success", "Doctor added successfully!");
      setForm(emptyForm);
      onAdded?.(res.data);
    } catch (err) {
      showToast("error", err?.response?.data?.error || "Could not add doctor.");
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
            <UserPlus size={18} />
          </span>
          Add New Doctor
        </span>
        {open ? <ChevronUp className="text-emerald-600" /> : <ChevronDown className="text-emerald-600" />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className={inputClass} placeholder="Full Name *" value={form.name} onChange={(e) => update("name", e.target.value)} />
          <input className={inputClass} placeholder="Specialization *" value={form.specialization} onChange={(e) => update("specialization", e.target.value)} />
          <input className={inputClass} type="email" placeholder="Email *" value={form.email} onChange={(e) => update("email", e.target.value)} />
          <input className={inputClass} placeholder="Phone *" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          <input className={inputClass} placeholder="Experience (e.g. 8 years)" value={form.experience} onChange={(e) => update("experience", e.target.value)} />
          <input className={inputClass} placeholder="Qualifications (e.g. MBBS, MD)" value={form.qualifications} onChange={(e) => update("qualifications", e.target.value)} />
          <input className={inputClass} placeholder="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
          <input className={inputClass} placeholder="Image URL" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} />
          <input className={inputClass} type="number" min={0} placeholder="Consultation Fee (₹) *" value={form.fee} onChange={(e) => update("fee", e.target.value)} />
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
            placeholder="About the doctor"
            rows={3}
            value={form.about}
            onChange={(e) => update("about", e.target.value)}
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
              {loading ? "Adding…" : "Add Doctor"}
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
