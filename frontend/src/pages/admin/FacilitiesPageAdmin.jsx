import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, Layout, Building2 } from "lucide-react";
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

const FacilitiesPageAdmin = ({
  items,
  pageInfo,
  token,
  onRefresh,
  showNotification,
}) => {
  const [activeTab, setActiveTab] = useState("facilities-list");

  // State for Page Headers & Overview Form
  const [pageForm, setPageForm] = useState({
    heroEyebrow: pageInfo?.heroEyebrow || "Our Facilities",
    heroTitle: pageInfo?.heroTitle || "Modern Infrastructure",
    heroTitleHighlight: pageInfo?.heroTitleHighlight || "For Better Learning",
    heroDescription:
      pageInfo?.heroDescription ||
      "Explore our well-equipped classrooms, science and computer labs, library, sports grounds, and safe transportation facilities.",
    overviewEyebrow: pageInfo?.overviewEyebrow || "Our Campus",
    overviewTitle: pageInfo?.overviewTitle || "Spaces That Support",
    overviewTitleHighlight:
      pageInfo?.overviewTitleHighlight || "Every Kind of Learning",
    overviewDescription:
      pageInfo?.overviewDescription ||
      "A good school environment plays an important role in a student's development. Our facilities are designed to support classroom learning while also giving students opportunities to experiment, create, play and explore.",
    overviewImage: pageInfo?.overviewImage || "/images/about.png",
    overviewBadgeText: pageInfo?.overviewBadgeText || "Learn With Confidence",
    campusFeaturesStr:
      pageInfo?.campusFeatures?.join("\n") ||
      "Modern learning spaces\nPractical learning facilities\nDedicated sports opportunities\nReading & resource areas\nTechnology-enabled education\nStudent-friendly environment",
  });

  const [savingPage, setSavingPage] = useState(false);

  useEffect(() => {
    if (pageInfo) {
      setPageForm({
        heroEyebrow: pageInfo.heroEyebrow || "Our Facilities",
        heroTitle: pageInfo.heroTitle || "Modern Infrastructure",
        heroTitleHighlight: pageInfo.heroTitleHighlight || "For Better Learning",
        heroDescription: pageInfo.heroDescription || "",
        overviewEyebrow: pageInfo.overviewEyebrow || "Our Campus",
        overviewTitle: pageInfo.overviewTitle || "Spaces That Support",
        overviewTitleHighlight: pageInfo.overviewTitleHighlight || "Every Kind of Learning",
        overviewDescription: pageInfo.overviewDescription || "",
        overviewImage: pageInfo.overviewImage || "/images/about.png",
        overviewBadgeText: pageInfo.overviewBadgeText || "Learn With Confidence",
        campusFeaturesStr: pageInfo.campusFeatures?.join("\n") || "",
      });
    }
  }, [pageInfo]);

  // Handle Page Form Save
  const handlePageFormSubmit = async (e) => {
    e.preventDefault();
    setSavingPage(true);
    try {
      const payload = {
        heroEyebrow: pageForm.heroEyebrow,
        heroTitle: pageForm.heroTitle,
        heroTitleHighlight: pageForm.heroTitleHighlight,
        heroDescription: pageForm.heroDescription,
        overviewEyebrow: pageForm.overviewEyebrow,
        overviewTitle: pageForm.overviewTitle,
        overviewTitleHighlight: pageForm.overviewTitleHighlight,
        overviewDescription: pageForm.overviewDescription,
        overviewImage: pageForm.overviewImage,
        overviewBadgeText: pageForm.overviewBadgeText,
        campusFeatures: pageForm.campusFeaturesStr
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      await updateAdminData("facilities/page", "PUT", payload, token);
      showNotification("Facilities Page headers and overview updated!");
      onRefresh();
    } catch (err) {
      alert(err.message || "Failed to update facility page info");
    } finally {
      setSavingPage(false);
    }
  };

  // State for Facility Add/Edit Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    iconName: "Building2",
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      title: "",
      description: "",
      image: "",
      iconName: "Monitor",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description || "",
      image: item.image,
      iconName: item.iconName || "Building2",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this facility?")) return;
    try {
      await updateAdminData(`facilities/${id}`, "DELETE", null, token);
      showNotification("Facility deleted!");
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
          `facilities/${editingItem._id}`,
          "PUT",
          form,
          token
        );
        showNotification("Facility updated!");
      } else {
        await updateAdminData("facilities", "POST", form, token);
        showNotification("Facility created!");
      }
      setModalOpen(false);
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl font-black text-slate-900">Manage Facilities Page</h3>
          <p className="mt-0.5 text-xs text-slate-500 font-semibold">
            Edit page titles, campus overview section, and add/edit individual facilities.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-3 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("facilities-list")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold transition ${
            activeTab === "facilities-list"
              ? "bg-[#082b55] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Building2 size={15} />
          Facilities Cards ({items?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("page-headers")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold transition ${
            activeTab === "page-headers"
              ? "bg-[#082b55] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Layout size={15} />
          Page Headers & Campus Overview
        </button>
      </div>

      {/* TAB 1: FACILITIES LIST */}
      {activeTab === "facilities-list" && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-800">Campus Facilities List</h4>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-[#082b55] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#f5b400] hover:text-[#082b55]"
            >
              <Plus size={15} /> Add Facility
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between"
              >
                <div>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-36 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {item.description || "No description provided."}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2">
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
        </div>
      )}

      {/* TAB 2: PAGE HEADERS & OVERVIEW */}
      {activeTab === "page-headers" && (
        <form onSubmit={handlePageFormSubmit} className="mt-6 space-y-6 max-w-3xl">
          {/* Hero Section Form */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
            <h4 className="text-xs font-black uppercase text-[#082b55] tracking-wider">
              1. Hero Header Section
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700">Hero Eyebrow Tag</label>
              <input
                type="text"
                value={pageForm.heroEyebrow}
                onChange={(e) => setPageForm({ ...pageForm, heroEyebrow: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Hero Main Title Line 1</label>
                <input
                  type="text"
                  value={pageForm.heroTitle}
                  onChange={(e) => setPageForm({ ...pageForm, heroTitle: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Hero Highlight Title Line 2 (Yellow)</label>
                <input
                  type="text"
                  value={pageForm.heroTitleHighlight}
                  onChange={(e) => setPageForm({ ...pageForm, heroTitleHighlight: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Hero Description</label>
              <textarea
                rows="2"
                value={pageForm.heroDescription}
                onChange={(e) => setPageForm({ ...pageForm, heroDescription: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                required
              />
            </div>
          </div>

          {/* Campus Overview Section Form */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
            <h4 className="text-xs font-black uppercase text-[#082b55] tracking-wider">
              2. Campus Overview Section
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700">Overview Eyebrow</label>
              <input
                type="text"
                value={pageForm.overviewEyebrow}
                onChange={(e) => setPageForm({ ...pageForm, overviewEyebrow: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Overview Section Title Line 1</label>
                <input
                  type="text"
                  value={pageForm.overviewTitle}
                  onChange={(e) => setPageForm({ ...pageForm, overviewTitle: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Overview Highlight Title Line 2 (Yellow)</label>
                <input
                  type="text"
                  value={pageForm.overviewTitleHighlight}
                  onChange={(e) => setPageForm({ ...pageForm, overviewTitleHighlight: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Overview Description Text</label>
              <textarea
                rows="3"
                value={pageForm.overviewDescription}
                onChange={(e) => setPageForm({ ...pageForm, overviewDescription: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>

            <ImageUploadPreview
              label="Campus Overview Image"
              value={pageForm.overviewImage || ""}
              onChange={(val) => setPageForm({ ...pageForm, overviewImage: val })}
            />

            <div>
              <label className="block text-xs font-bold text-slate-700">Overview Image Overlay Badge Text</label>
              <input
                type="text"
                value={pageForm.overviewBadgeText}
                onChange={(e) => setPageForm({ ...pageForm, overviewBadgeText: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                Campus Highlights Checklist (One per line)
              </label>
              <textarea
                rows="5"
                value={pageForm.campusFeaturesStr}
                onChange={(e) => setPageForm({ ...pageForm, campusFeaturesStr: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingPage}
              className="inline-flex items-center gap-2 rounded-xl bg-[#082b55] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#f5b400] hover:text-[#082b55]"
            >
              <Save size={16} />
              {savingPage ? "Saving Changes..." : "Save Page Headers & Overview"}
            </button>
          </div>
        </form>
      )}

      {/* Facility Add/Edit Modal */}
      {modalOpen && (
        <Modal
          title={editingItem ? "Edit Facility" : "Add Facility"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Facility Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                required
              />
            </div>

            <ImageUploadPreview
              label="Facility Image"
              value={form.image || ""}
              onChange={(val) => setForm({ ...form, image: val })}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Description
              </label>
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Icon Name (Monitor, FlaskConical, Building2, Library, Dumbbell, Bus)
              </label>
              <input
                type="text"
                value={form.iconName}
                onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#082b55] py-3 text-xs font-bold text-white hover:bg-[#f5b400] hover:text-[#082b55]"
            >
              Save Facility
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacilitiesPageAdmin;
