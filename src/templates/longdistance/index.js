import CallScene from "./scenes/CallScene";
import TimeScene from "./scenes/TimeScene";
import HugScene from "./scenes/HugScene";
import GlobeScene from "./scenes/GlobeScene";
import BoardingPassScene from "./scenes/BoardingPassScene";
import FinalScene from "./scenes/FinalScene";
import { data } from "./mockData";

export default {
  id: "longdistance",
  title: "Two Cities, One Sky",
  emoji: "🌍",
  description:
    "For long distance love. Call, align your clocks, send a hug, fly across the globe and scratch your next meet date.",
  theme: {
    bg: "bg-gradient-to-b from-indigo-950 via-indigo-900 to-teal-900",
    floater: "✨",
    accent: "bg-teal-500",
  },
  mockData: data,
  scenes: [
    CallScene,
    TimeScene,
    HugScene,
    GlobeScene,
    BoardingPassScene,
    FinalScene,
  ],
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
      title: "Your two cities",
      scene: 1,
      fields: [
        { key: "cityA", label: "Your city", placeholder: "Delhi" },
        { key: "cityB", label: "Their city", placeholder: "London" },
      ],
    },
    {
      title: "Next time you meet",
      scene: 4,
      fields: [
        { key: "nextMeet", label: "Next-meet date", placeholder: "14 February 2027" },
      ],
    },
    {
      title: "Your message",
      scene: 5,
      fields: [
        { key: "message", type: "textarea", label: "Final message", placeholder: "Tell them what the distance means to you..." },
      ],
    },
  ],
};