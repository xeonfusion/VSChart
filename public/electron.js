const { app, BrowserWindow } = require("electron");
const path = require('path');
const url = require('url');

let win;
function CreateWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "VSChart",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

  win.loadURL(startUrl);
}

app.whenReady().then(CreateWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
