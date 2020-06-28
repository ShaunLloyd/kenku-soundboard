import path from "path";
import Electron from "electron";

import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

import { ELECTRON_IS_DEVELOPMENT_MODE, IS_MACOS } from "./electron.utilities";

let browserWindow: Electron.BrowserWindow | null = null;
const application = Electron.app || Electron.remote.app;

const createWindow = () => {
  browserWindow = new Electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const appUri = ELECTRON_IS_DEVELOPMENT_MODE
    ? "http://localhost:3000/index.html"
    : `file://${__dirname}/../index.html`;

  browserWindow.loadURL(appUri);

  browserWindow.on("closed", () => (browserWindow = null));

  // Hot Reloading
  if (ELECTRON_IS_DEVELOPMENT_MODE) {
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron"
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });

    // DevTools
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }
};

application
  .on("ready", createWindow)
  .on("window-all-closed", () => !IS_MACOS && application.quit())
  .on("activate", () => browserWindow === null && createWindow());
