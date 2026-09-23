import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { updateAdminData } from "../../services/adminApi";

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-base font-bold"
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

const TestimonialsPageAdmin = ({
  items,
  token,
  onRefresh,
  showNotification,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "Parent",
    initials: "",
    text: "",
    rating: 5,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      role: "Parent",
      initials: "",
      text: "",
      rating: 5,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      role: item.role || "Parent",
      initials: item.initials || "",
      text: item.text,
      rating: item.rating || 5,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    try {
      await updateAdminData(`testimonials/${id}`, "DELETE", null, token);
      showNotification("Testimonial deleted!");
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateAdminData(
          `testimonials/${editingItem._id}`,
          "PUT",
          form,
          token
        );
        showNotification("Testimonial updated!");
      } else {
        await updateAdminData("testimonials", "POST", form, token);
        showNotification("Testimonial created!");
      }
      setModalOpen(false);
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Manage Testimonials & Reviews
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Parent and student feedback & reviews displayed on the website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 p-5 shadow-xs bg-slate-50/50"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-amber-400">
                  {item.initials || item.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 italic">
                “{item.text}”
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-200/60 pt-3">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 text-slate-600 hover:text-slate-900"
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-1.5 text-red-500 hover:text-red-700"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal
          title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Person Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Role (e.g. Parent / Student)
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Initials (e.g. PS)
              </label>
              <input
                type="text"
                value={form.initials}
                onChange={(e) => setForm({ ...form, initials: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Testimonial Text
              </label>
              <textarea
                rows="4"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-800"
            >
              Save Testimonial
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TestimonialsPageAdmin;
