import { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CalendarDays,
  MessageSquare,
  Sliders,
} from "lucide-react";
import ImageUploadPreview from "../../components/admin/ImageUploadPreview";
import { updateAdminData } from "../../services/adminApi";

// Reusable Modal Component
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

const HomePageAdmin = ({
  hero,
  token,
  onSavedHero,
  events = [],
  testimonials = [],
  onRefreshData,
  showNotification,
}) => {
  const [subTab, setSubTab] = useState("hero-sliders");

  // Form State for Hero Sliders
  const [slides, setSlides] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [savingHero, setSavingHero] = useState(false);

  // Events Modal State
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    location: "School Campus",
    description: "",
    image: "",
  });

  // Testimonials Modal State
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "Parent",
    initials: "",
    text: "",
    rating: 5,
  });

  useEffect(() => {
    if (hero?.slides && hero.slides.length > 0) {
      setSlides(hero.slides);
    } else if (hero) {
      setSlides([
        {
          badge: hero.badge || "Welcome To",
          title: hero.title || "The Kaizen School",
          highlightedText: hero.highlightedText || "Bhana",
          description: hero.description || "",
          image: hero.image || "/images/hero-school.png",
          primaryButtonText: hero.primaryButtonText || "Enquire Now",
          primaryButtonLink: hero.primaryButtonLink || "/contact",
          secondaryButtonText: hero.secondaryButtonText || "Watch Video",
          secondaryButtonLink: hero.secondaryButtonLink || "",
        },
      ]);
    } else {
      setSlides([
        {
          badge: "Welcome To",
          title: "The Kaizen School",
          highlightedText: "Bhana",
          description:
            "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
          image: "/images/hero-school.png",
          primaryButtonText: "Enquire Now",
          primaryButtonLink: "/contact",
          secondaryButtonText: "Watch Video",
          secondaryButtonLink: "",
        },
      ]);
    }
  }, [hero]);

  // =====================================
  // HERO SLIDES HANDLERS
  // =====================================
  const handleAddSlide = () => {
    const newSlide = {
      badge: "Quality Education",
      title: "New Hero Banner",
      highlightedText: "Kaizen School",
      description: "Empowering students with knowledge, leadership, and values.",
      image: "/images/hero-school.png",
      primaryButtonText: "Explore More",
      primaryButtonLink: "/about",
      secondaryButtonText: "Contact Us",
      secondaryButtonLink: "/contact",
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setActiveSlideIndex(updated.length - 1);
  };

  const handleRemoveSlide = (index) => {
    if (slides.length <= 1) {
      alert("At least one Hero slide must remain.");
      return;
    }
    if (!window.confirm(`Delete Slide #${index + 1}?`)) return;

    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    if (activeSlideIndex >= updated.length) {
      setActiveSlideIndex(updated.length - 1);
    }
  };

  const handleMoveSlide = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const copy = [...slides];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    setSlides(copy);
    setActiveSlideIndex(targetIndex);
  };

  const handleSlideFieldChange = (field, value) => {
    const copy = [...slides];
    copy[activeSlideIndex] = {
      ...copy[activeSlideIndex],
      [field]: value,
    };
    setSlides(copy);
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSavingHero(true);

    try {
      const activeSlide = slides[0] || {};
      const payload = {
        slides: slides,
        badge: activeSlide.badge,
        title: activeSlide.title,
        highlightedText: activeSlide.highlightedText,
        description: activeSlide.description,
        image: activeSlide.image,
        primaryButtonText: activeSlide.primaryButtonText,
        primaryButtonLink: activeSlide.primaryButtonLink,
        secondaryButtonText: activeSlide.secondaryButtonText,
        secondaryButtonLink: activeSlide.secondaryButtonLink,
      };

      const res = await updateAdminData("hero", "PUT", payload, token);
      if (res.success) {
        onSavedHero(res.hero);
        showNotification("Homepage Hero Sliders updated successfully!");
      }
    } catch (err) {
      alert(err.message || "Failed to update hero sliders");
    } finally {
      setSavingHero(false);
    }
  };

  const currentSlide = slides[activeSlideIndex] || {};

  // =====================================
  // EVENT HANDLERS (ADD/EDIT/DELETE)
  // =====================================
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      date: "",
      location: "School Campus",
      description: "",
      image: "",
    });
    setEventModalOpen(true);
  };

  const handleOpenEditEvent = (item) => {
    setEditingEvent(item);
    setEventForm({
      title: item.title,
      date: item.date,
      location: item.location || "School Campus",
      description: item.description || "",
      image: item.image || "",
    });
    setEventModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete event?")) return;
    try {
      await updateAdminData(`events/${id}`, "DELETE", null, token);
      showNotification("Event deleted!");
      onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateAdminData(
          `events/${editingEvent._id}`,
          "PUT",
          eventForm,
          token
        );
        showNotification("Event updated!");
      } else {
        await updateAdminData("events", "POST", eventForm, token);
        showNotification("Event created!");
      }
      setEventModalOpen(false);
      onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  // =====================================
  // TESTIMONIAL HANDLERS (ADD/EDIT/DELETE)
  // =====================================
  const handleOpenAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: "",
      role: "Parent",
      initials: "",
      text: "",
      rating: 5,
    });
    setTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonial = (item) => {
    setEditingTestimonial(item);
    setTestimonialForm({
      name: item.name,
      role: item.role || "Parent",
      initials: item.initials || "",
      text: item.text,
      rating: item.rating || 5,
    });
    setTestimonialModalOpen(true);
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    try {
      await updateAdminData(`testimonials/${id}`, "DELETE", null, token);
      showNotification("Testimonial deleted!");
      onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await updateAdminData(
          `testimonials/${editingTestimonial._id}`,
          "PUT",
          testimonialForm,
          token
        );
        showNotification("Testimonial updated!");
      } else {
        await updateAdminData("testimonials", "POST", testimonialForm, token);
        showNotification("Testimonial created!");
      }
      setTestimonialModalOpen(false);
      onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-700 border border-amber-500/20">
              <Sparkles size={12} />
              Homepage Manager Hub
            </span>
            <h3 className="mt-2 text-xl font-black text-slate-900">
              Manage Live Homepage
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Update Hero Sliders, Events, Testimonials, and Stats displayed on your homepage.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-100 p-1.5 border border-slate-200">
            <button
              onClick={() => setSubTab("hero-sliders")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-extrabold transition ${
                subTab === "hero-sliders"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Sliders size={14} />
              Hero Sliders ({slides.length})
            </button>

            <button
              onClick={() => setSubTab("events")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-extrabold transition ${
                subTab === "events"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <CalendarDays size={14} />
              Events ({events.length})
            </button>

            <button
              onClick={() => setSubTab("testimonials")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-extrabold transition ${
                subTab === "testimonials"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <MessageSquare size={14} />
              Testimonials ({testimonials.length})
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: HERO SLIDERS MANAGER */}
      {subTab === "hero-sliders" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Hero Banner Sliders ({slides.length} Slides)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit, remove, or reorder the rotating hero banner slides on your homepage.
              </p>
            </div>

            <button
              onClick={handleAddSlide}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-slate-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 transition"
            >
              <Plus size={16} /> Add New Hero Slide
            </button>
          </div>

          {/* Slide Tabs Navigation */}
          <div className="mt-5 flex flex-wrap items-center gap-3 overflow-x-auto pb-2">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2 transition ${
                  activeSlideIndex === idx
                    ? "border-amber-500 bg-amber-50/70 text-slate-950 shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setActiveSlideIndex(idx)}
                  className="text-left font-bold text-xs flex items-center gap-2"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                      activeSlideIndex === idx
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="max-w-[130px] truncate">
                    {slide.title || `Slide #${idx + 1}`}
                  </span>
                </button>

                {/* Move Up/Down & Remove */}
                <div className="flex items-center gap-0.5 ml-1 border-l border-slate-200 pl-1.5">
                  {idx > 0 && (
                    <button
                      onClick={() => handleMoveSlide(idx, -1)}
                      title="Move Left/Up"
                      className="p-1 text-slate-400 hover:text-slate-800"
                    >
                      <ArrowUp size={12} className="-rotate-90 sm:rotate-0" />
                    </button>
                  )}
                  {idx < slides.length - 1 && (
                    <button
                      onClick={() => handleMoveSlide(idx, 1)}
                      title="Move Right/Down"
                      className="p-1 text-slate-400 hover:text-slate-800"
                    >
                      <ArrowDown size={12} className="-rotate-90 sm:rotate-0" />
                    </button>
                  )}
                  {slides.length > 1 && (
                    <button
                      onClick={() => handleRemoveSlide(idx)}
                      title="Delete Slide"
                      className="p-1 text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Active Slide Form */}
          {slides.length > 0 && (
            <form onSubmit={handleSaveHero} className="mt-6 space-y-5 max-w-3xl border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Editing Slide #{activeSlideIndex + 1}: {currentSlide.title}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Total Sliders: {slides.length}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={currentSlide.badge || ""}
                    onChange={(e) => handleSlideFieldChange("badge", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                    placeholder="e.g. Welcome To"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Main Heading Title
                  </label>
                  <input
                    type="text"
                    value={currentSlide.title || ""}
                    onChange={(e) => handleSlideFieldChange("title", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                    placeholder="e.g. The Kaizen School"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Highlighted Title (Yellow)
                  </label>
                  <input
                    type="text"
                    value={currentSlide.highlightedText || ""}
                    onChange={(e) =>
                      handleSlideFieldChange("highlightedText", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                    placeholder="e.g. Bhana"
                  />
                </div>
              </div>

              <ImageUploadPreview
                label={`Slide #${activeSlideIndex + 1} Hero Banner Image`}
                value={currentSlide.image || ""}
                onChange={(val) => handleSlideFieldChange("image", val)}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Description Paragraph
                </label>
                <textarea
                  rows="3"
                  value={currentSlide.description || ""}
                  onChange={(e) =>
                    handleSlideFieldChange("description", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                  placeholder="Enter slide description..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={currentSlide.primaryButtonText || ""}
                    onChange={(e) =>
                      handleSlideFieldChange("primaryButtonText", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={currentSlide.primaryButtonLink || ""}
                    onChange={(e) =>
                      handleSlideFieldChange("primaryButtonLink", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={currentSlide.secondaryButtonText || ""}
                    onChange={(e) =>
                      handleSlideFieldChange("secondaryButtonText", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={currentSlide.secondaryButtonLink || ""}
                    onChange={(e) =>
                      handleSlideFieldChange("secondaryButtonLink", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingHero}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-slate-800 shadow-md"
              >
                <Save size={15} />
                {savingHero ? "Saving All Sliders..." : "Save All Hero Sliders"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* SUB-TAB 2: EVENTS ON HOMEPAGE */}
      {subTab === "events" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Homepage Featured Events ({events.length})
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit, or delete events directly from the Home Page section.
              </p>
            </div>
            <button
              onClick={handleOpenAddEvent}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <Plus size={15} /> Add Event
            </button>
          </div>

          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No events added yet. Click "+ Add Event" above to create one.
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 shadow-xs bg-slate-50/50"
                >
                  <div className="flex items-center gap-4">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">
                        {event.title}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        📅 {event.date} | 📍 {event.location || "School Campus"}
                      </p>
                      {event.description && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditEvent(event)}
                      className="p-1.5 text-slate-600 hover:text-slate-900"
                      title="Edit Event"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Delete Event"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TESTIMONIALS ON HOMEPAGE */}
      {subTab === "testimonials" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Homepage Community Testimonials ({testimonials.length})
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit, or delete parent/student reviews directly from the Home Page section.
              </p>
            </div>
            <button
              onClick={handleOpenAddTestimonial}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <Plus size={15} /> Add Testimonial
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center sm:col-span-3">
                No testimonials added yet. Click "+ Add Testimonial" above to create one.
              </p>
            ) : (
              testimonials.map((item) => (
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
                        <h5 className="font-bold text-slate-900 text-sm">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-slate-400">{item.role}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 italic">
                      “{item.text}”
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-200/60 pt-3">
                    <button
                      onClick={() => handleOpenEditTestimonial(item)}
                      className="p-1.5 text-slate-600 hover:text-slate-900"
                      title="Edit Testimonial"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(item._id)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Delete Testimonial"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* EVENT MODAL */}
      {eventModalOpen && (
        <Modal
          title={editingEvent ? "Edit Event" : "Add Event"}
          onClose={() => setEventModalOpen(false)}
        >
          <form onSubmit={handleSubmitEvent} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Event Title
              </label>
              <input
                type="text"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({ ...eventForm, title: e.target.value })
                }
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
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({ ...eventForm, date: e.target.value })
                }
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
                value={eventForm.location}
                onChange={(e) =>
                  setEventForm({ ...eventForm, location: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Description
              </label>
              <textarea
                rows="3"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({ ...eventForm, description: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>

            <ImageUploadPreview
              label="Event Photo (Optional)"
              value={eventForm.image || ""}
              onChange={(val) => setEventForm({ ...eventForm, image: val })}
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

      {/* TESTIMONIAL MODAL */}
      {testimonialModalOpen && (
        <Modal
          title={editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
          onClose={() => setTestimonialModalOpen(false)}
        >
          <form onSubmit={handleSubmitTestimonial} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Person Name
              </label>
              <input
                type="text"
                value={testimonialForm.name}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, name: e.target.value })
                }
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
                value={testimonialForm.role}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, role: e.target.value })
                }
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
                value={testimonialForm.initials}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    initials: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Testimonial Text
              </label>
              <textarea
                rows="4"
                value={testimonialForm.text}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, text: e.target.value })
                }
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

export default HomePageAdmin;
