const { app, BrowserWindow } = require('electron');

let win = null;

function createWindow() {
    win = new BrowserWindow({ width: 1200, height: 800, nodeIntegration: true });
    win.loadFile('./dist/index.html');
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
    
    let menuTemplate = [
        {
            label: 'My Modules',
            click() {
                win.webContents.executeJavaScript("location.assign('#!/modules')");
            }
        }
    ];
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);