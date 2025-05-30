import { HOME } from "@/constants";
import type { Page } from "@/types";
import { create } from "zustand";
import type { ULID } from "ulid";

interface State {
  page: Page;
  isRecording: boolean;
  recordingStartTime: Date | null;
  recordingUlid: ULID | null;
  gameDirectory: string;
  screenshotsDirectory: string;
}

interface Action {
  setPage: (page: State["page"]) => void;
  setIsRecording: (isRecording: State["isRecording"]) => void;
  setRecordingStartTime: (startTime: State["recordingStartTime"]) => void;
  setRecordingUlid: (ulid: ULID | null) => void;
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
  recordingStartTime: null,
  setRecordingStartTime: (startTime: Date | null) =>
    set({ recordingStartTime: startTime }),
  recordingUlid: null,
  setRecordingUlid: (ulid: ULID | null) => set({ recordingUlid: ulid }),
}));
