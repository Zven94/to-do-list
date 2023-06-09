import editTask from './editTask.js';

const reditTask = editTask;

export default class Task {
  static initialize() {
    const todoTask = new Task();
    return todoTask;
  }

  constructor() {
    this.taskList = document.querySelector('.to-do-list');
    this.divLi = document.querySelector('.divLi');
    this.addBtn = document.querySelector('.submitButton');
    this.arr = [];
    this.loadTask();
    this.addBtn.addEventListener('click', () => this.addTask());
    
  }

  saveTask = () => {
    localStorage.setItem('task', JSON.stringify(this.arr));
    
  }

  displayTask = () => {
    
    this.divLi.innerHTML = '';
    this.arr.forEach((task, index) => {
      
      const elementLi = document.createElement('li');
      const elementDiv = document.createElement('div');
      const elementDiv2 = document.createElement('div');
      const elementInput = document.createElement('input');
      const elementLabel = document.createElement('input');
      const elementButton = document.createElement('button');
      const elementDeleteButton = document.createElement('button');
      elementButton.classList.add('threeDots');
      elementDeleteButton.classList.add('elementDeleteButton');
      elementDiv.classList.add('elementDiv1');
      elementDiv2.classList.add('elementDiv2');
      elementLabel.classList.add('taskLabel')
    
      this.divLi.appendChild(elementLi);
      elementLi.appendChild(elementDiv);
      elementDiv.appendChild(elementInput);
      elementDiv.appendChild(elementLabel);
      elementLi.appendChild(elementDiv2)
      elementDiv2.appendChild(elementDeleteButton);
      elementDiv2.appendChild(elementButton);
      elementInput.type = 'checkbox';
      elementLabel.value = `${task.taskToDo}`;
      elementDeleteButton.textContent = 'X';
      elementButton.textContent = '...';

      elementDeleteButton.addEventListener('click', () => {
        this.removeTask(index);
      });

      elementLabel.addEventListener('focusin', () => {
        elementLi.style.boxShadow = '0 0 10px rgba(5, 110, 200, 0.8)';
      });
      elementLabel.addEventListener('focusout', () => {
        elementLi.style.border = '1px solid rgba(0, 0, 0, 0.15)';
        elementLi.style.boxShadow = 'none';
        console.log(elementLabel.value)
        this.saveTask;
      });
    });

  }

  addTask = (index) => {
    console.log('add task')
    const taskInput = document.querySelector('.taskInput');
    const taskToDo = taskInput.value;
    const solved = false;
    const taskNumber = index;

    if (taskToDo === '') {
      alert('Please enter a task to list.');
      return;
    }

    const task = {
      taskToDo,
      solved,
      taskNumber,
    };

    this.arr.push(task);
    this.saveTask();
    taskInput.value = '';
    this.displayTask();
  }

  removeTask = (index) => {
    console.log(this.arr + 'remove')
    this.arr.splice(index, 1);
    this.saveTask();
    console.log(this.arr)
    this.displayTask();

  }

  loadTask = () => {console.log('hello task')
    const storedTask = localStorage.getItem('task');
    if (storedTask) {
      this.arr = JSON.parse(storedTask);
      this.displayTask();
    }
  }
}