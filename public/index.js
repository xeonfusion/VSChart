const {app, BrowserWindow} = require('electron')
let win;
function CreateWindow() {
    win = new BrowserWindow({
    width:800,
    height:600,
    title:'VSCaptureChart',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
    //win.loadFile('index.html')
    win.loadURL('http://localhost:3000/')
  }

  app.whenReady().then(CreateWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
