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

const GalleryPageAdmin = ({ items, token, onRefresh, showNotification }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Campus",
    image: "",
    description: "",
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "Campus",
      image: "",
      description: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category || "Campus",
      image: item.image,
      description: item.description || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete gallery item?")) return;
    try {
      await updateAdminData(`gallery/${id}`, "DELETE", null, token);
      showNotification("Gallery item deleted!");
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload an image for the gallery.");
      return;
    }
    try {
      if (editingItem) {
        await updateAdminData(`gallery/${editingItem._id}`, "PUT", form, token);
        showNotification("Gallery item updated!");
      } else {
        await updateAdminData("gallery", "POST", form, token);
        showNotification("Gallery item added!");
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
          <h3 className="text-lg font-extrabold text-slate-900">Manage Gallery Page</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Add, edit, or delete photos in the school gallery.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          <Plus size={15} /> Add Photo
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {item.category}
              </span>
              <h4 className="mt-1.5 font-bold text-slate-900 text-sm">{item.title}</h4>
              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-2">
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
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal
          title={editingItem ? "Edit Photo" : "Add Photo"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Photo Title
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
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              >
                <option value="Campus">Campus</option>
                <option value="Events">Events</option>
                <option value="Activities">Activities</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <ImageUploadPreview
              label="Gallery Photo"
              value={form.image || ""}
              onChange={(val) => setForm({ ...form, image: val })}
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-950 py-3 text-xs font-bold text-white hover:bg-slate-800"
            >
              Save Photo
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GalleryPageAdmin;
