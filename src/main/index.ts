import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import * as path from 'path';
import * as url from 'url';

const isProd = process.env.NODE_ENV === 'production';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true
    });

    if (isProd) {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        mainWindow.loadURL('http://localhost:8855');
    }
    
    ipcMain.on('notify', (_, message) => {
        console.log(message);
        new Notification({
            title: message,
            body: '\nOnly works in ipcMain'
        }).show();
    });
}

process.stdout.on('kill', () => {
    console.log('quitting app');
    app.quit();
});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    app.quit();
    process.exit();
});