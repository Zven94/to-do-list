// import _ from 'lodash';
import './style.css';

/*
function component() {
  const element = document.createElement('p');

  // Lodash, now imported by this script
  // element.innerHTML = _.join(['to-do', 'list'], ' ');
  element.innerHTML = _.arr;

  element.classList.add('p-toDoList');

  return element;
}

document.body.appendChild(component());
*/

// build array to store objects

const arr = [];
const elementLu = document.querySelector('.to-do-list');

// create object with properties (description=string,completed=boolean,index=number)
// to be store in arr

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const task1 = new Task('Add correct style to awesome-book app', true, 1);
arr.push(task1);

const task2 = new Task('Add remove button to awesome-book app', false, 2);
arr.push(task2);

const task3 = new Task('Add contact section to awesome-book app', true, 3);
arr.push(task3);

// function to iterate the array and set the li items

function createList(element) {
  const elementLi = document.createElement('li');
  const elementInput = document.createElement('input');
  const elementLabel = document.createElement('label');

  elementLu.appendChild(elementLi);
  elementLi.appendChild(elementInput);
  elementLi.appendChild(elementLabel);

  elementInput.type = 'checkbox';

  elementLabel.textContent = `${element.description}, ${element.completed}, ${element.index}`;
}

arr.forEach(createList);
