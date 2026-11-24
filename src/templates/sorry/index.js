import KnockScene from "./scenes/KnockScene";
import TeddyScene from "./scenes/TeddyScene";
import MessageScene from "./scenes/MessageScene";
import BalloonsScene from "./scenes/BalloonsScene";
import PlantScene from "./scenes/PlantScene";
import FinalScene from "./scenes/FinalScene";
import { data } from "./mockData";

export default {
  id: "sorry",
  title: "Sorry Template",
  emoji: "🧸",
  description:
    "A cute interactive way to say sorry. Knock knock, teddy, balloons and a little plant that grows.",
  theme: {
    bg: "bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200",
    floater: "💗",
    accent: "bg-pink-500",
  },
  mockData: data,
  scenes: [
    KnockScene,
    TeddyScene,
    MessageScene,
    BalloonsScene,
    PlantScene,
    FinalScene,
  ],
  // each step = one page of the Create form. `scene` = which scene the live preview jumps to
  steps: [
    {
      title: "Who is this for?",
      scene: 0,
      fields: [
        { key: "senderName", label: "Your name", placeholder: "Manu", required: true },
        { key: "receiverName", label: "Their name", placeholder: "Riya", required: true },
      ],
    },
    {
      title: "The teddy",
      scene: 1,
      fields: [
        { key: "teddyAsk", label: "What the teddy asks at the door", placeholder: "Can I come in? 🥺" },
        { key: "teddyMessage", type: "textarea", label: "Teddy's message", placeholder: "Say sorry in your own words..." },
      ],
    },
    {
      title: "Balloons",
      scene: 3,
      fields: [
        { key: "photos", type: "photos" },
        { key: "balloonMessages", type: "list", count: 4, label: "Balloon message", placeholder: "I love your laugh" },
      ],
    },
    {
      title: "The plant",
      scene: 4,
      fields: [
        { key: "plantPrompt", label: "Prompt above the plant", placeholder: "Water the plant to grow our love back 🌱" },
        { key: "plantMessage", type: "textarea", label: "Message when it grows", placeholder: "Like this plant, I'll keep working..." },
      ],
    },
    {
      title: "Final message",
      scene: 5,
      fields: [
        { key: "finalMessage", type: "textarea", label: "Your final words", placeholder: "I'm sorry. Will you forgive me?" },
      ],
    },
  ],
};