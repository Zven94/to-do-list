// function to mark as completed

const markComplete = (tasks, index) => {
  if (tasks[index].solved === false) {
    tasks[index].solved = true;
  } else {
    tasks[index].solved = false;
  }
  return tasks[index].solved;
};
export default markComplete;