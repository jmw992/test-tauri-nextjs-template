import type { HISTORY, HOME, RECORD, SETTINGS } from "@/constants";

export type Page = typeof HISTORY | typeof SETTINGS | typeof HOME | typeof RECORD;