export function formatCurrency(v) {
  return `₹${Number(v || 0).toLocaleString("en-IN")}`;
}

export function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const statusClasses = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "bg-cyan-50 text-cyan-700 border border-cyan-100";
  if (s === "completed") return "bg-emerald-50 text-emerald-700 border border-emerald-100";
  if (s === "cancelled" || s === "canceled") return "bg-rose-50 text-rose-700 border border-rose-100";
  return "bg-yellow-50 text-yellow-700 border border-yellow-100"; // pending
};
