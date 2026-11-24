import { ImagePlus, X } from "lucide-react";

const MAX = 4;

export default function PhotoUploader({ photos, setPhotos }) {
  const add = (e) => {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        setPhotos((prev) =>
          prev.length < MAX ? [...prev, reader.result] : prev
        );
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const remove = (i) => setPhotos((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="mb-4">
      <span className="mb-2 block text-sm font-semibold text-pink-600">
        Your photos (up to {MAX})
      </span>
      <div className="flex flex-wrap gap-3">
        {photos.map((src, i) => (
          <div key={i} className="relative h-20 w-20">
            <img src={src} alt="" className="h-full w-full rounded-xl object-cover" />
            <button
              onClick={() => remove(i)}
              className="absolute -right-2 -top-2 rounded-full bg-pink-500 p-1 text-white"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {photos.length < MAX && (
          <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-pink-300 text-pink-400 hover:bg-pink-50">
            <ImagePlus size={24} />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={add}
            />
          </label>
        )}
      </div>
    </div>
  );
}