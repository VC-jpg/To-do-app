const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', async function() {
  const tasks = await ipcRenderer.invoke('load-tasks');
  
  // Cargar las tareas en la lista
  const taskList = document.querySelector('.task-list');
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.category}`;
    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.title}</span>
      <span class="task-due-date">Fecha ${new Date(task.date).toLocaleDateString()}</span>
    `;
    taskList.appendChild(taskItem);
  });

  // Resto del código de tu aplicación
  const modal = document.getElementById("taskModal");
  const btn = document.getElementById("add-task-btn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const date = document.getElementById('task-date').value;
    const category = document.getElementById('task-category').value;

    if (title) {
      const task = {
        title,
        date,
        category,
        completed: false
      };

      const taskList = document.querySelector('.task-list');
      const taskItem = document.createElement('li');
      taskItem.className = `task-item ${category}`;
      taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span>${title}</span>
        <span class="task-due-date">Fecha ${new Date(date).toLocaleDateString()}</span>
      `;
      taskList.appendChild(taskItem);

      // Guardar la tarea
      ipcRenderer.invoke('save-tasks', [...taskList.children].map(item => {
        return {
          title: item.querySelector('span').textContent,
          date: item.querySelector('.task-due-date').textContent.replace('Fecha ', ''),
          category: item.className.split(' ')[1],
          completed: item.querySelector('.task-checkbox').checked
        };
      }));

      modal.style.display = "none";
    }
  });

  document.querySelector('.task-list').addEventListener('change', function(event) {
    if (event.target.classList.contains('task-checkbox')) {
      const taskItem = event.target.closest('.task-item');
      if (event.target.checked) {
        taskItem.querySelector('span').style.textDecoration = 'line-through';
      } else {
        taskItem.querySelector('span').style.textDecoration = 'none';
      }

      // Guardar el estado de la tarea
      ipcRenderer.invoke('save-tasks', [...document.querySelector('.task-list').children].map(item => {
        return {
          title: item.querySelector('span').textContent,
          date: item.querySelector('.task-due-date').textContent.replace('Fecha ', ''),
          category: item.className.split(' ')[1],
          completed: item.querySelector('.task-checkbox').checked
        };
      }));
    }
  });

  document.querySelector('.sidebar').addEventListener('click', function(event) {
    if (event.target.classList.contains('category-item')) {
      const category = event.target.getAttribute('data-category');
      filterTasksByCategory(category);
    }
  });

  document.getElementById('clear-filter').addEventListener('click', function() {
    filterTasksByCategory('');
  });

  function filterTasksByCategory(category) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(function(task) {
      if (category === '' || task.classList.contains(category)) {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
  }
});
