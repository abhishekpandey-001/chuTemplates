import EnvelopeScene from "./scenes/EnvelopeScene";
import MapScene from "./scenes/MapScene";
import StampScene from "./scenes/StampScene";
import CloudsScene from "./scenes/CloudsScene";
import PostcardScene from "./scenes/PostcardScene";
import FinalScene from "./scenes/FinalScene";
import { data } from "./mockData";

export default {
  id: "missyou",
  title: "Paper Plane Post",
  emoji: "✉️",
  description:
    "A miss-you note that flies across the map, with a wax stamp, moonlit clouds and a scratch-off postcard.",
  theme: {
    bg: "bg-gradient-to-b from-sky-200 via-sky-100 to-white",
    floater: "☁️",
    accent: "bg-orange-500",
  },
  mockData: data,
  scenes: [
    EnvelopeScene,
    MapScene,
    StampScene,
    CloudsScene,
    PostcardScene,
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
      title: "The journey",
      scene: 1,
      fields: [
        { key: "fromCity", label: "Your city", placeholder: "Delhi" },
        { key: "toCity", label: "Their city", placeholder: "Mumbai" },
        { key: "distance", label: "Distance between you", placeholder: "1,400 km" },
      ],
    },
    {
      title: "Your message",
      scene: 2,
      fields: [
        { key: "message", type: "textarea", label: "The note inside the envelope", placeholder: "Tell them how much you miss them..." },
      ],
    },
    {
      title: "The postcard",
      scene: 4,
      fields: [
        { key: "postcardLine", label: "Line hidden under the scratch card", placeholder: "I miss you" },
      ],
    },
  ],
};