import { HOME } from "@/constants";
import type { Page } from "@/types";
import { create } from "zustand";

interface State {
  page: Page;
  isRecording: boolean;
  gameDirectory: string;
  screenshotsDirectory: string;
}

interface Action {
  setPage: (page: State["page"]) => void;
  setIsRecording: (isRecording: State["isRecording"]) => void;
  setGameDirectory: (gameDirectory: State["gameDirectory"]) => void;
  setScreenshotsDirectory: (
    gameDirectory: State["screenshotsDirectory"],
  ) => void;
}

export const useZustandStore = create<State & Action>((set) => ({
  page: HOME,
  setPage: (value: Page) => {
    set({ page: value });
  },
  isRecording: false,
  setIsRecording: (value: boolean) => {
    set({ isRecording: value });
  },
  gameDirectory: "",
  setGameDirectory: (value: string) => {
    set({ gameDirectory: value });
  },
  screenshotsDirectory: "",
  setScreenshotsDirectory: (value: string) => {
    set({ screenshotsDirectory: value });
  },
}));
