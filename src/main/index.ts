import 'reflect-metadata';
import { app, BrowserWindow, ipcMain } from 'electron';
import { Connection } from './helpers';
import { Task } from './models';
import * as path from 'path';
import * as url from 'url';

const isProd = process.env.NODE_ENV === 'production';

async function createWindow() {
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
    
    const db = await Connection();

    ipcMain.handle('get_task_list', async (event) => {
        const taskRepository = db.getRepository(Task);
        const tasklist = await taskRepository.find();
        event.sender.postMessage('get_task_list', tasklist);
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