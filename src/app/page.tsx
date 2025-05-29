"use client";
import Home from "@/components/pages/Home";
import History from "@/components/pages/History";
import Settings from "@/components/pages/Settings";
import Record from "@/components/pages/Record";
import { HISTORY, HOME, RECORD, SETTINGS } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Page } from "@/types";
import type React from "react";
import { use, useEffect } from "react";
import {
  getGameDirectoryStore,
  getScreenshotsDirectoryStore,
} from "@/lib/persistStorage";

const PageMap: Record<Page, React.FC> = {
  [HOME]: Home,
  [HISTORY]: History,
  [SETTINGS]: Settings,
  [RECORD]: Record,
};

export default function RootPage() {
  const page = useZustandStore((state) => state.page);
  const setGameDirectory = useZustandStore((state) => state.setGameDirectory);
  const setScreenshotDirectory = useZustandStore(
    (state) => state.setScreenshotsDirectory,
  );
  useEffect(() => {
    console.log("jmw root re-render????");
    // Set default from localStorage on first load
    const gameDirectory = getGameDirectoryStore();
    if (gameDirectory) {
      setGameDirectory(gameDirectory);
    }
    const screenshotsDirectory = getScreenshotsDirectoryStore();
    if (screenshotsDirectory) {
      setScreenshotDirectory(screenshotsDirectory);
    }
  }, [setGameDirectory, setScreenshotDirectory]);

  const PageComponent = PageMap[page];
  return <PageComponent />;
}
