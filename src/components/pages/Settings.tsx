"use client";

import { FolderInput } from "@/components/FolderInputDialog";
import {
  setGameDirectoryStore,
  setScreenshotsDirectoryStore,
} from "@/lib/persistStorage";
import { useZustandStore } from "@/lib/useZustandStore";

export default function Settings() {
  const gameDirectory = useZustandStore((state) => state.gameDirectory);
  const screenshotDirectory = useZustandStore(
    (state) => state.screenshotsDirectory,
  );
  const setGameDirectory = useZustandStore((state) => state.setGameDirectory);
  const setScreenshotDirectory = useZustandStore(
    (state) => state.setScreenshotsDirectory,
  );

  return (
    <>
      <p>App Directory for Total War Warhammer 3</p>
      <FolderInput
        title={"Select"}
        inputPlaceholder={
          gameDirectory || "C://{MyUser}/AppData/Total War Warhammer 3"
        }
        onChange={(value: string) => {
          setGameDirectory(value);
          setGameDirectoryStore(value);
        }}
      />

      <p>App Directory for Screenshots</p>
      <FolderInput
        title={"Select"}
        inputPlaceholder={
          screenshotDirectory ||
          "C://{MyUser}/AppData/Total War Warhammer 3/Screenshots"
        }
        onChange={(value) => {
          setScreenshotDirectory(value);
          setScreenshotsDirectoryStore(value);
        }}
      />
    </>
  );
}
