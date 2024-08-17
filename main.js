const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Función para crear la ventana principal
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');
}

// Crear la ventana cuando la aplicación está lista
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar la aplicación cuando todas las ventanas están cerradas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Manejar la solicitud para guardar tareas
ipcMain.handle('save-tasks', async (event, tasks) => {
  try {
    fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error al guardar las tareas:', err);
  }
});

// Manejar la solicitud para cargar tareas
ipcMain.handle('load-tasks', async () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'tasks.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al cargar las tareas:', err);
    return [];
  }
});
