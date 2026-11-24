import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import SceneFlow from "../components/SceneFlow";
import ProgressBar from "../components/ProgressBar";
import Field from "../components/Field";
import PhotoUploader from "../components/PhotoUploader";
import { data as mock } from "../data/mockData";

const TOTAL = 5;
// which scene the live preview jumps to for each form step
const STEP_TO_SCENE = [0, 1, 3, 4, 5];

const emptyForm = {
  senderName: "",
  receiverName: "",
  teddyAsk: "",
  teddyMessage: "",
  balloonMessages: ["", "", "", ""],
  photos: [],
  plantPrompt: "",
  plantMessage: "",
  finalMessage: "",
};

const pick = (v, fallback) => (v.trim() ? v : fallback);

// empty fields fall back to mock data so the preview never looks broken
function buildPreview(f) {
  const msgs = f.balloonMessages.filter((m) => m.trim());
  return {
    senderName: pick(f.senderName, mock.senderName),
    receiverName: pick(f.receiverName, mock.receiverName),
    teddyAsk: pick(f.teddyAsk, mock.teddyAsk),
    teddyMessage: pick(f.teddyMessage, mock.teddyMessage),
    balloonMessages: msgs.length ? msgs : mock.balloonMessages,
    photos: f.photos.length ? f.photos : mock.photos,
    plantPrompt: pick(f.plantPrompt, mock.plantPrompt),
    plantMessage: pick(f.plantMessage, mock.plantMessage),
    finalMessage: pick(f.finalMessage, mock.finalMessage),
  };
}

export default function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [finished, setFinished] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const setBalloonMsg = (i) => (value) =>
    setForm((f) => ({
      ...f,
      balloonMessages: f.balloonMessages.map((m, idx) => (idx === i ? value : m)),
    }));
  const setPhotos = (updater) =>
    setForm((f) => ({ ...f, photos: updater(f.photos) }));

  const preview = buildPreview(form);
  const canNext =
    step !== 0 || (form.senderName.trim() && form.receiverName.trim());

  if (finished) {
    return (
      <div className="relative h-screen w-full overflow-y-auto">
        <button
          onClick={() => setFinished(false)}
          className="absolute left-4 top-4 z-50 flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-pink-600 shadow"
        >
          <Pencil size={14} /> Edit
        </button>
        <SceneFlow data={preview} />
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h2 className="mb-4 text-xl font-bold text-pink-600">Who is this for?</h2>
            <Field label="Your name" value={form.senderName} onChange={set("senderName")} placeholder="Manu" />
            <Field label="Their name" value={form.receiverName} onChange={set("receiverName")} placeholder="Riya" />
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-4 text-xl font-bold text-pink-600">The teddy</h2>
            <Field label="What the teddy asks at the door" value={form.teddyAsk} onChange={set("teddyAsk")} placeholder="Can I come in? 🥺" />
            <Field textarea label="Teddy's message" value={form.teddyMessage} onChange={set("teddyMessage")} placeholder="Say sorry in your own words..." />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-4 text-xl font-bold text-pink-600">Balloons</h2>
            <PhotoUploader photos={form.photos} setPhotos={setPhotos} />
            {form.balloonMessages.map((m, i) => (
              <Field key={i} label={`Balloon message ${i + 1}`} value={m} onChange={setBalloonMsg(i)} placeholder="I love your laugh" />
            ))}
          </>
        );
      case 3:
        return (
          <>
            <h2 className="mb-4 text-xl font-bold text-pink-600">The plant</h2>
            <Field label="Prompt above the plant" value={form.plantPrompt} onChange={set("plantPrompt")} placeholder="Water the plant to grow our love back 🌱" />
            <Field textarea label="Message when it grows" value={form.plantMessage} onChange={set("plantMessage")} placeholder="Like this plant, I'll keep working..." />
          </>
        );
      default:
        return (
          <>
            <h2 className="mb-4 text-xl font-bold text-pink-600">Final message</h2>
            <Field textarea label="Your final words" value={form.finalMessage} onChange={set("finalMessage")} placeholder="I'm sorry. Will you forgive me?" />
          </>
        );
    }
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

            <ProgressBar step={step} total={TOTAL} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="rounded-full px-5 py-2 font-semibold text-pink-500 disabled:opacity-30"
              >
                Back
              </button>

              {step < TOTAL - 1 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
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
            <SceneFlow key={step} data={preview} startAt={STEP_TO_SCENE[step]} />
          </div>
        </div>
      </div>
    </div>
  );
}