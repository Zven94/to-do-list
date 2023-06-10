import markComplete from './statusUpdate.js';

export default class Task {
  static initialize() {
    const todoTask = new Task();
    return todoTask;
  }

  constructor() {
    this.divLi = document.querySelector('.divLi');
    this.addBtn = document.querySelector('.submitButton');
    this.taskInput = document.querySelector('.taskInput');
    this.arr = [];
    this.loadTask();
    this.addBtn.addEventListener('click', () => this.addTask(this.taskInput.value, this.arr.length));
    this.taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.addTask(this.taskInput.value, this.arr.length);
      }
    });
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
      elementLabel.classList.add('taskLabel');

      this.divLi.appendChild(elementLi);
      elementLi.appendChild(elementDiv);
      elementDiv.appendChild(elementInput);
      elementDiv.appendChild(elementLabel);
      elementLi.appendChild(elementDiv2);
      elementDiv2.appendChild(elementDeleteButton);
      elementDiv2.appendChild(elementButton);
      elementInput.type = 'checkbox';
      elementInput.classList.add('checkbox');

      if (task.solved === true) {
        elementInput.checked = true;
      }

      elementLabel.value = `${task.taskToDo}`;
      elementDeleteButton.textContent = 'X';
      elementButton.textContent = '...';
      const clearButton = document.querySelector('.to-do-ClearButton');
      clearButton.addEventListener('click', this.deletedFinishTask);
      elementDeleteButton.addEventListener('click', () => {
        this.removeTask(index);
      });

      elementLabel.addEventListener('focusin', () => {
        elementLi.style.boxShadow = '0 0 10px rgba(5, 110, 200, 0.8)';
      });
      elementLabel.addEventListener('focusout', () => {
        elementLi.style.border = '1px solid rgba(0, 0, 0, 0.15)';
        elementLi.style.boxShadow = 'none';
        task.taskToDo = elementLabel.value;
        this.saveTask();
      });
      elementInput.addEventListener('change', () => {
        this.completeTask(index);
        this.saveTask();
      });
    });
    this.taskInput.placeholder = 'Add to your list...';
    this.taskInput.classList.remove('taskInputERROR');
  }

  addTask = (newValue) => {
    const taskToDo = newValue;
    const solved = false;
    const taskNumber = this.arr.length + 1;

    if (taskToDo === '') {
      this.taskInput.placeholder = 'FILL THIS FIELD';
      this.taskInput.classList.add('taskInputERROR');
      return;
    }

    const task = {
      taskToDo,
      solved,
      taskNumber,
    };

    this.arr.push(task);
    this.saveTask();
    this.taskInput.value = '';
    this.displayTask();
  }

  removeTask = (index) => {
    this.arr.splice(index, 1);
    this.arr.forEach((task, index) => {
      task.taskNumber = index + 1;
    });
    this.saveTask();
    this.displayTask();
  }

  completeTask = (index) => {
    this.arr.solved = markComplete(this.arr, index);
  }

  deletedFinishTask = () => {
    this.arr = this.arr.filter((element) => element.solved !== true);
    this.saveTask();
    this.displayTask();
  }

  loadTask = () => {
    const storedTask = localStorage.getItem('task');
    if (storedTask) {
      this.arr = JSON.parse(storedTask);
      this.displayTask();
    }
  }
}
