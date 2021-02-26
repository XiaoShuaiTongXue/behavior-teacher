'use strict'

import {app, BrowserWindow} from 'electron'

let ipcMain = require('electron').ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let win
let newWin
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  win = new BrowserWindow({
    width: 630,
    height: 510,
    webPreferences: {
      nodeIntegration: true
    }
    // resizable: false,
    // frame: false
  })

  win.loadURL(winURL)

  win.on('closed', () => {
    win = null
  })
}

ipcMain.on('close', function () {
  app.quit()
})

ipcMain.on('do-register', function () {
  newWin = new BrowserWindow({
    width: 595,
    height: 605,
    label: '用户注册',
    resizable: false,
    submenu: ''
  })
  newWin.loadURL(winURL + '/#/register')
  newWin.on('closed', () => {
    win = null
  })
})

const path = require('path')

let pyProc = null

const createPyProc = () => {
  let port = '800'
  let script = path.join(__dirname, '../renderer/assets/python/s.py')
  pyProc = require('child_process').spawn('python', [script, port])
  if (pyProc != null) {
    console.log('child process success')
  }
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    pyProc.kill()
    pyProc = null
  }
})

ipcMain.on('login-success', function () {
  createPyProc()
  win.loadURL(winURL + '/#/index')
  win.setSize(1382, 777)
  win.center()
})
