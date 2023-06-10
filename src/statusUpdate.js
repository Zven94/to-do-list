// function to mark as completed

export default const markComplete = (tasks, index) => {
  if (tasks[index].solved === false) {
    tasks[index].solved = true;
  } else {
    tasks[index].solved = false;
  }
  return tasks[index].solved;
};