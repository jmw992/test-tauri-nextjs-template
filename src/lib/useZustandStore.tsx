import { create } from "zustand";
import { HOME } from "@/constants";
import type { Page } from "@/types";

type State = {
  page: Page;
  isRecording: boolean;
  gameDirectory: string;
  screenshotsDirectory: string;
};

type Action = {
  setPage: (page: State["page"]) => void;
  setIsRecording: (isRecording: State["isRecording"]) => void;
  setGameDirectory: (gameDirectory: State["gameDirectory"]) => void;
  setScreenshotsDirectory: (
    gameDirectory: State["screenshotsDirectory"],
  ) => void;
};

export const useZustandStore = create<State & Action>((set) => ({
  page: HOME,
  setPage: (value: Page) => set({ page: value }),
  isRecording: false,
  setIsRecording: (value: boolean) => set({ isRecording: value }),
  gameDirectory: "",
  setGameDirectory: (value: string) => set({ gameDirectory: value }),
  screenshotsDirectory: "",
  setScreenshotsDirectory: (value: string) =>
    set({ screenshotsDirectory: value }),
}));
