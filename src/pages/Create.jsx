import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import SceneFlow from "../shared/components/SceneFlow";
import ProgressBar from "../shared/components/ProgressBar";
import Field from "../shared/components/Field";
import PhotoUploader from "../shared/components/PhotoUploader";
import { getTemplate } from "../templates";

function initialForm(template) {
  const form = {};
  template.steps.forEach((s) =>
    s.fields.forEach((f) => {
      if (f.type === "photos") form[f.key] = [];
      else if (f.type === "list") form[f.key] = Array(f.count).fill("");
      else form[f.key] = "";
    })
  );
  return form;
}

// empty fields fall back to the template's mock data so the preview never looks broken
function buildPreview(template, form) {
  const out = { ...template.mockData };
  template.steps.forEach((s) =>
    s.fields.forEach((f) => {
      const v = form[f.key];
      if (f.type === "photos") {
        if (v.length) out[f.key] = v;
      } else if (f.type === "list") {
        const filled = v.filter((m) => m.trim());
        if (filled.length) out[f.key] = filled;
      } else if (v.trim()) {
        out[f.key] = v;
      }
    })
  );
  return out;
}

export default function Create() {
  const { id } = useParams();
  const template = getTemplate(id);
  if (!template) return <Navigate to="/" replace />;
  return <CreateForm template={template} />;
}

function CreateForm({ template }) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(() => initialForm(template));
  const [finished, setFinished] = useState(false);

  const total = template.steps.length;
  const step = template.steps[stepIndex];
  const preview = buildPreview(template, form);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const setListItem = (key, i) => (value) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].map((m, idx) => (idx === i ? value : m)),
    }));
  const setPhotos = (key) => (updater) =>
    setForm((f) => ({ ...f, [key]: updater(f[key]) }));

  const canNext = step.fields.every(
    (f) => !f.required || form[f.key].trim()
  );

  if (finished) {
    return (
      <div className="relative h-screen w-full overflow-y-auto">
        <button
          onClick={() => setFinished(false)}
          className="absolute left-4 top-4 z-50 flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-pink-600 shadow"
        >
          <Pencil size={14} /> Edit
        </button>
        <SceneFlow
          scenes={template.scenes}
          theme={template.theme}
          data={preview}
        />
      </div>
    );
  }

  const renderField = (f) => {
    if (f.type === "photos")
      return (
        <PhotoUploader
          key={f.key}
          photos={form[f.key]}
          setPhotos={setPhotos(f.key)}
        />
      );
    if (f.type === "list")
      return form[f.key].map((m, i) => (
        <Field
          key={`${f.key}-${i}`}
          label={`${f.label} ${i + 1}`}
          value={m}
          onChange={setListItem(f.key, i)}
          placeholder={f.placeholder}
        />
      ));
    return (
      <Field
        key={f.key}
        textarea={f.type === "textarea"}
        label={f.label}
        value={form[f.key]}
        onChange={set(f.key)}
        placeholder={f.placeholder}
      />
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100 p-4 lg:p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        {/* left: form */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <button
              onClick={() => navigate("/")}
              className="mb-4 flex items-center gap-1 text-sm font-semibold text-pink-400"
            >
              <ArrowLeft size={14} /> Home
            </button>

            <ProgressBar step={stepIndex} total={total} />

            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mb-4 text-xl font-bold text-pink-600">
                  {step.title}
                </h2>
                {step.fields.map(renderField)}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStepIndex((s) => s - 1)}
                disabled={stepIndex === 0}
                className="rounded-full px-5 py-2 font-semibold text-pink-500 disabled:opacity-30"
              >
                Back
              </button>

              {stepIndex < total - 1 ? (
                <button
                  onClick={() => setStepIndex((s) => s + 1)}
                  disabled={!canNext}
                  className="flex items-center gap-2 rounded-full bg-pink-500 px-6 py-2 font-semibold text-white shadow disabled:opacity-40"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setFinished(true)}
                  className="flex items-center gap-2 rounded-full bg-pink-500 px-6 py-2 font-semibold text-white shadow"
                >
                  Finish <Check size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* right: live preview */}
        <div className="w-full lg:sticky lg:top-6 lg:w-1/2 lg:self-start">
          <p className="mb-2 text-sm font-semibold text-pink-600">Live preview</p>
          <div className="h-[70vh] overflow-y-auto rounded-3xl shadow-xl lg:h-[calc(100vh-5rem)]">
            <SceneFlow
              key={stepIndex}
              scenes={template.scenes}
              theme={template.theme}
              data={preview}
              startAt={step.scene}
            />
          </div>
        </div>
      </div>
    </div>
  );
}