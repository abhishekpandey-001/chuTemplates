import sorry from "./sorry";
import missyou from "./missYou";

export const templates = [sorry, missyou];

export const getTemplate = (id) => templates.find((t) => t.id === id);