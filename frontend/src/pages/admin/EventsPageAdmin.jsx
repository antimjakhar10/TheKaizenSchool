import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import ImageUploadPreview from "../../components/admin/ImageUploadPreview";
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

const EventsPageAdmin = ({ items, token, onRefresh, showNotification }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "School Campus",
    description: "",
    image: "",
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      title: "",
      date: "",
      location: "School Campus",
      description: "",
      image: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      date: item.date,
      location: item.location || "School Campus",
      description: item.description || "",
      image: item.image || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete event?")) return;
    try {
      await updateAdminData(`events/${id}`, "DELETE", null, token);
      showNotification("Event deleted!");
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateAdminData(`events/${editingItem._id}`, "PUT", form, token);
        showNotification("Event updated!");
      } else {
        await updateAdminData("events", "POST", form, token);
        showNotification("Event created!");
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
          <h3 className="text-lg font-extrabold text-slate-900">Manage Events & Calendar</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            School events, functions and announcements.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          <Plus size={15} /> Add Event
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 shadow-xs bg-slate-50/50"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              )}
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  📅 {item.date} | 📍 {item.location}
                </p>
                <p className="text-xs text-slate-600 mt-1">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
          title={editingItem ? "Edit Event" : "Add Event"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Event Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Event Date (e.g. October 15, 2025)
              </label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Description
              </label>
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>

            <ImageUploadPreview
              label="Event Photo (Optional)"
              value={form.image || ""}
              onChange={(val) => setForm({ ...form, image: val })}
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-800"
            >
              Save Event
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default EventsPageAdmin;
