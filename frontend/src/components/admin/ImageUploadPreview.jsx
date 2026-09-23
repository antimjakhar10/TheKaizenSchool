import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const ImageUploadPreview = ({ value, onChange, label = "Upload Image" }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (file) => {
    setError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, GIF).");
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group inline-block max-w-full">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1">
            <img
              src={value}
              alt="Preview"
              className="h-40 w-full max-w-sm rounded-lg object-cover shadow-xs"
            />
          </div>

          {/* Remove Cross Button */}
          <button
            type="button"
            onClick={() => {
              onChange("");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            title="Remove Image"
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700 hover:scale-110 active:scale-95"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition text-center ${
            isDragging
              ? "border-amber-500 bg-amber-50/50"
              : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100/80"
          }`}
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <Upload size={18} />
          </div>
          <p className="text-xs font-semibold text-slate-700">
            Click to upload or drag & drop image
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            PNG, JPG, WEBP, GIF up to 5MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default ImageUploadPreview;
