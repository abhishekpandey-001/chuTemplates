import LanternScene from "./scenes/LanternScene";
import HeartsScene from "./scenes/HeartsScene";
import PolaroidScene from "./scenes/PolaroidScene";
import GlowScene from "./scenes/GlowScene";
import FinalScene from "./scenes/FinalScene";
import { data } from "./mockData";

export default {
  id: "anniversary",
  title: "Memory Lanterns",
  emoji: "🏮",
  description:
    "An anniversary gift. Light the lanterns, join two heart halves, swipe through memories and send your lantern up.",
  theme: {
    bg: "bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900",
    floater: "🕯️",
    accent: "bg-rose-500",
  },
  mockData: data,
  scenes: [
    LanternScene,
    HeartsScene,
    PolaroidScene,
    GlowScene,
    FinalScene,
  ],
  steps: [
    {
      title: "You two",
      scene: 1,
      fields: [
        { key: "senderName", label: "Your name", placeholder: "Manu", required: true },
        { key: "receiverName", label: "Their name", placeholder: "Riya", required: true },
        { key: "years", label: "Years together", placeholder: "3" },
      ],
    },
    {
      title: "Your memories",
      scene: 2,
      fields: [
        { key: "photos", type: "photos" },
        { key: "memories", type: "list", count: 3, label: "Memory caption", placeholder: "Our first trip together" },
      ],
    },
    {
      title: "Final note",
      scene: 3,
      fields: [
        { key: "finalNote", type: "textarea", label: "Your note for them", placeholder: "Thank you for every year..." },
      ],
    },
  ],
};