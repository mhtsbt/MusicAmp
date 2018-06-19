// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
var http = require('http');

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  //const testFolder = 'D:\\Music';

  const songscanner = require("./songscanner");
  var songs = songscanner.getLibrary();



  http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'audio/mpeg' });

    var hash = req.url.replace('/', '');
    console.log(hash);

    var song = songs.filter(s => { return s.hash === hash })[0];
    console.log(song);
    var songData = fs.readFileSync(song.path);
    res.end(songData);

  }).listen(9000);

  /*
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  })*/


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.