"use client";
import History from "@/components/pages/History";
import Home from "@/components/pages/Home";
import Record from "@/components/pages/Record";
import Settings from "@/components/pages/Settings";
import {
  AUTO_SAVE_REPLAY_NAME,
  DEFAULT_GAME_DIRECTORY,
  HISTORY,
  HOME,
  RECORD,
  SETTINGS,
} from "@/constants";
import {
  getGameDirectoryStore,
  getScreenshotsDirectoryStore,
} from "@/lib/persistStorage";
import { runEverySecond } from "@/lib/runEverySecond";
import { useZustandStore } from "@/lib/useZustandStore";
import { copyNewAutoSave } from "@/lib/copyNewAutoSave";
import type React from "react";
import { useEffect } from "react";

export default function AppState({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setGameDirectory = useZustandStore((state) => state.setGameDirectory);
  const setScreenshotDirectory = useZustandStore(
    (state) => state.setScreenshotsDirectory,
  );

  const gameDirectory = useZustandStore((state) => state.gameDirectory);
  const screenshotsDirectory = useZustandStore(
    (state) => state.screenshotsDirectory,
  );
  const isRecording = useZustandStore((state) => state.isRecording);
  const recordingStartTime = useZustandStore(
    (state) => state.recordingStartTime,
  );
  const recordingUlid = useZustandStore((state) => state.recordingUlid);

  useEffect(() => {
    // Set default from localStorage on first load
    const gameDirectoryStore =
      getGameDirectoryStore() ?? DEFAULT_GAME_DIRECTORY;
    setGameDirectory(gameDirectoryStore);
    const screenshotsDirectoryStore =
      getScreenshotsDirectoryStore() ?? DEFAULT_GAME_DIRECTORY;
    setScreenshotDirectory(screenshotsDirectoryStore);
  }, [setGameDirectory, setScreenshotDirectory]);

  useEffect(() => {
    console.log("Check if we can start monitoring for auto-saves");
    if (!isRecording || !recordingUlid || !recordingStartTime) {
      return;
    }
    // Example: perform an action every second
    const cleanup = runEverySecond(() => {
      console.log("Running every second during recording...");
      copyNewAutoSave({
        sourceFromRoot: `${gameDirectory}/replays/${AUTO_SAVE_REPLAY_NAME}`,
        destinationRelative: `${recordingUlid}/${AUTO_SAVE_REPLAY_NAME}`,
        recordStartTime: recordingStartTime,
        newSaveRoot: recordingUlid.toString(),
        onCopy: () => {
          console.log("Auto-save copied successfully.");
        },
      });
    });
    return cleanup;
  }, [gameDirectory, isRecording, recordingStartTime, recordingUlid]);

  return children;
}
