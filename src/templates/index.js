import sorry from "./sorry";
import missyou from "./missYou";
import longdistance from "./longdistance";

export const templates = [sorry, missyou, longdistance];

export const getTemplate = (id) => templates.find((t) => t.id === id);