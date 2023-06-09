
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
      const elementInput = document.createElement('input');
      const elementLabel = document.createElement('label');
      const elementButton = document.createElement('button');
      const elementDeleteButton = document.createElement('button');
      elementButton.classList.add('threeDots');
    
      this.divLi.appendChild(elementLi);
      elementLi.appendChild(elementDiv);
      elementDiv.appendChild(elementInput);
      elementDiv.appendChild(elementLabel);
      elementLi.appendChild(elementDeleteButton);
      elementLi.appendChild(elementButton);
      elementInput.type = 'checkbox';
      elementLabel.textContent = `${task.taskToDo}`;
      elementDeleteButton.textContent = 'X';
      elementButton.textContent = '...';

      elementDeleteButton.addEventListener('click', () => {
        this.removeTask(index);
      });
      
      //this.taskList.insertBefore(elementLi, this.taskList.firstChild);
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