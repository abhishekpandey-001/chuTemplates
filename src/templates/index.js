import sorry from "./sorry";
import missyou from "./missYou";
import longdistance from "./longdistance";
import anniversary from "./anniversary";

export const templates = [sorry, missyou];

export const getTemplate = (id) => templates.find((t) => t.id === id);