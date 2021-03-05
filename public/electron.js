const { app, BrowserWindow } = require("electron");
const {ipcMain, shell} = require("electron");
const fs = require('fs');
const os = require('os');
const path = require('path');
const url = require('url');

let win;
function CreateWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    //useContentSize: true,
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

ipcMain.on('print-to-pdf', function (event) {
  const pdfPath = path.join(os.tmpdir(), 'vschartprint.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  
  win.webContents.printToPDF({printBackground: true, landscape: true}, function (error, data) {
    if (error) return console.log(error.message)
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        return console.log (error.message)
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})

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
