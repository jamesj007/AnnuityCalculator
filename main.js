const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const Menu = electron.Menu

const path = require('path')
const url = require('url')

// set environemnt
//process.env.NODE_ENV = 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

//credits windows
let creditWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 850, height: 600, titleBarStyle: 'hidden'})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/public/pages/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    app.quit()
  })

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

//create credits window

function creditsWindow() {
  creditWindow = new BrowserWindow({width: 600, height: 300, titleBarStyle: 'hidden'})

  creditWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/public/pages/credits.html'),
    protocol: 'file:',
    slashes: true
  }))

  creditWindow.on('closed', function () {
    creditWindow = null
  })

  const credMenu = Menu.buildFromTemplate(creditMenu);
  Menu.setApplicationMenu(credMenu);
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

// create app menu template

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Credits',
        click() {
          creditsWindow();
        }
      },
      {
        role: 'reload'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      },
    ]
  }
]


const creditMenu = [
  {
    label: 'File',
    submenu: [
      {
        role: 'reload'
      },
    ]
  }
]

if (process.platform == 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}