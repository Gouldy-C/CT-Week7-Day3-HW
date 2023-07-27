const themeBtn = document.querySelector(".theme-btn");
const themeBtnClasses = themeBtn.classList;
const bodyClasses = document.querySelector("body").classList;
const toDoForm = document.querySelector(".to-do-form");
const submitButton = document.querySelector(".sub-btn");
const toDoArea = document.querySelector(".to-do-items");
const toDoMes = document.querySelector('.to-do-header')

localStorage

darkMode();

function darkMode() {
  bodyClasses.add("bg-dark", "text-light");
  bodyClasses.remove("bg-light", "text-dark");
  themeBtnClasses.add("btn-light");
  themeBtnClasses.remove("btn-dark");
  toDoForm.style.backgroundColor = "#435B66";
  themeBtn.innerText = "Light";
}

function lightMode() {
  bodyClasses.add("bg-light", "text-dark");
  bodyClasses.remove("bg-dark", "text-light");
  themeBtnClasses.add("btn-dark");
  themeBtnClasses.remove("btn-light");
  toDoForm.style.backgroundColor = "#EAB2A0";
  themeBtn.innerText = "Dark";
}

themeBtn.addEventListener("click", () => {
  bodyClasses.contains("bg-dark") ? lightMode() : darkMode();
});

function titleCase(str) {
  const strList = str.split(" ");
  return strList
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

class ToDoItem {
  constructor(todo, priority, done) {
    this.todo = todo
    this.priority = priority
    this.done = done
  }
}

//localStorage.clear()
let toDoObjects = {};
console.log(toDoObjects)
let storedObject = localStorage.getItem("myObject")
console.log(storedObject)
if (storedObject) {
  toDoObjects = JSON.parse(storedObject)
  console.log(toDoObjects)
}


//let toDoCount = Object.keys(toDoObjects).length;

displayToDos(toDoObjects)


toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getToDoData();
  displayToDos(toDoObjects)
  toDoForm.reset()
});

function getToDoData(){
  const priorityLevel = document.getElementsByName('priority-level')
  let priority = ''
  for(level of priorityLevel){
    if (level.checked){
      priority = level.value}}
  const text = document.querySelector('#todo-input').value
  if (!priority || !text){
    console.log('invalid input')
  }else {
    toDoObjects[text] = new ToDoItem(todo=text, priority=priority, done=false)
  /* toDoCount++ */
  }
}


function displayToDos(obj) {
  toDoArea.innerHTML = ''
  if (Object.keys(obj).length) {
    for (const i in obj) {
      const done = obj[i].done
      const alertColor = done ? 'alert-secondary' : `alert-${obj[i].priority}`
      const btnColor = done ? 'btn-success' : `btn-secondary`
      const btnText = done ? 'Undo' : 'Done'
      const newToDo = 
        `<div class="alert-div alert ${alertColor}  d-flex align-items-center justify-content-between" id='${i}'>
          <div>
            ${obj[i].todo}
          </div>
          <div>
            <button type="button" class="done-btn btn ${btnColor} shadow p-2">${btnText}</button>
            <button type="button" class="close-btn btn btn-danger mx-2 text-black fw-bold fs-4 pt-0 shadow" >&times</button>
          </div>
        </div>`
      const toDoCard = document.createElement('div');
      toDoCard.innerHTML = newToDo
      const doneButton = toDoCard.querySelector('.done-btn')
      const toDoAlert = toDoCard.querySelector('.alert-div')
      toDoArea.appendChild(toDoCard)
      doneButton.addEventListener('click', () => {
        if (doneButton.innerText === 'Done') {
          toDoObjects[i].done = true
          displayToDos(toDoObjects)
        }
        else{
          toDoObjects[i].done = false
          displayToDos(toDoObjects)
      }})
      toDoCard.querySelector('.close-btn').addEventListener('click', () => {
        toDoCard.remove()
        delete toDoObjects[i]
        displayToDos(toDoObjects)
      })
      localStorage.setItem("myObject", JSON.stringify(toDoObjects))
    }
  } else {
    localStorage.clear()
    const toDoMes = document.createElement('h2')
    toDoMes.innerText = 'You have no To-Dos'
    toDoArea.appendChild(toDoMes)
  }
}
