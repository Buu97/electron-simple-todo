import { app } from 'electron';
import serve from 'electron-serve';
import { Task } from './database/models/Task';
import { createWindow, connection } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  try {
    const db = await connection();
    const repository = db.getRepository(Task);

    const task = new Task();
    task.title = 'One task';
    task.description = 'A description of a task';
    task.due_date = new Date();

    await repository.save(task);
  } catch (error) {
    console.error(error);
  }

  const mainWindow = createWindow('main', {
    width: 1080,
    height: 720,
    autoHideMenuBar: true,
    center: true,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
