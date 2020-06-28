import Electron from "electron";

const application = Electron.app || Electron.remote.app;

enum ElectronEnvironments {
  DEVELOPMENT = "development",
  PACKAGED = "packaged",
}

export const ELECTRON_ENVIRONMENT = application.isPackaged
  ? ElectronEnvironments.PACKAGED
  : ElectronEnvironments.DEVELOPMENT;

export const ELECTRON_IS_DEVELOPMENT_MODE: boolean =
  ELECTRON_ENVIRONMENT === ElectronEnvironments.DEVELOPMENT;

export const ELECTRON_IS_PRODUCTION_MODE: boolean =
  ELECTRON_ENVIRONMENT === ElectronEnvironments.PACKAGED;

export const IS_MACOS: boolean = process.platform === "darwin";
export const IS_WINDOWS: boolean = process.platform === "win32";
export const IS_LINUX: boolean = process.platform === "linux";
