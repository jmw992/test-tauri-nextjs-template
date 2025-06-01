import type { SupportedGames } from "@/types";
import type { PersistedState } from "./useZustandStore";
import { DEFAULT, TOTAL_WAR_WARHAMMER_3 } from "@/constants";

export const setScreenshotsDirectoryStore = (directory: string): void => {
  localStorage.setItem("screenshotsDirectory", directory);
};
export const setGameDirectoryStore = (directory: string): void => {
  localStorage.setItem("gameDirectory", directory);
};

export const getScreenshotsDirectoryStore = (): string | null => {
  return localStorage.getItem("screenshotsDirectory");
};
export const getGameDirectoryStore = (): string | null => {
  return localStorage.getItem("gameDirectory");
};

export const getStorePersistedSettings = (): PersistedState => {
  return {
    game:
      (localStorage.getItem("game") as SupportedGames) || TOTAL_WAR_WARHAMMER_3,
    mod: localStorage.getItem("mod") || DEFAULT,
    gameDirectory: localStorage.getItem("gameDirectory") || "",
    screenshotsDirectory: localStorage.getItem("screenshotsDirectory") || "",
  };
};

export const setStorePersistedSettings = (state: PersistedState) => {
  localStorage.setItem("game", state.game);
  localStorage.setItem("mod", state.mod);
  localStorage.setItem("gameDirectory", state.gameDirectory);
  localStorage.setItem("screenshotsDirectory", state.screenshotsDirectory);
};
