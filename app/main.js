const { BrowserWindow, app, ipcMain } = require('electron');
const { format } = require('url');
const { join } = require('path');
const isDev = require('electron-is-dev');
const Connection = require('./database/Connection');

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const db = await getConnection();
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadURL(format({
            pathname: join(__dirname, '..', 'build/index.html'),
            protocol: 'file:'
        }));
    }

    ipcMain.handle('get_task_list', async () => {
        let tasklist = [];
        if (db) {
            const repo = db.getRepository('Task');
            tasklist = await repo.find();
        }
        return tasklist;
    });
    ipcMain.handle('add_task', async (event, task) => {
        if (db) {
            const repo = db.getRepository('Task');
            task = await repo.save(task);
        }
        return task;
    });
    ipcMain.on('update_task', async (event, task) => {
        if (db) {
            const repo = db.getRepository('Task');
            const found = await repo.findOne(task.id);
            if (found) {
                delete task.id;
                await repo.save({ ...found, ...task });
            }
        }
    });
}

async function getConnection() {
    try {
        return await Connection;
    } catch (error) {
        console.error(error);
        return null;
    }
}

app.once('ready', createWindow);
app.once('window-all-closed', () => {
    app.quit();
});
