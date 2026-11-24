import sorry from "./sorry";
import missyou from "./missYou";
import longdistance from "./longdistance";
import anniversary from "./anniversary";

export const templates = [sorry];

export const getTemplate = (id) => templates.find((t) => t.id === id);