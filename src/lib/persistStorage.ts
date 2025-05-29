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
