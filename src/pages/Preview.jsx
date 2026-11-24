import { useNavigate, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SceneFlow from "../shared/components/SceneFlow";
import { getTemplate } from "../templates";

export default function Preview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const template = getTemplate(id);

  if (!template) return <Navigate to="/" replace />;

  return (
    <div className="relative h-screen w-full overflow-y-auto">
      <button
        onClick={() => navigate("/")}
        className="absolute left-4 top-4 z-50 flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-pink-600 shadow"
      >
        <ArrowLeft size={14} /> Back
      </button>
      <SceneFlow
        scenes={template.scenes}
        theme={template.theme}
        data={template.mockData}
      />
    </div>
  );
}