
// intial state

// let manageTask = [];
// let id = manageTask.length;
const TRASH_KEY = "trashTasks";

let trashTasks = JSON.parse(localStorage.getItem(TRASH_KEY)) || [];

function saveTrash(){
    localStorage.setItem(TRASH_KEY, JSON.stringify(trashTasks));
}


// STORAGE KEY
const STORAGE_KEY = "user";

// Initial State
let manageTask = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ID
let id = manageTask.length;

// Save Data
// set item in localstorage
function saveTask() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(manageTask));
}
// validate function
export function validateTask(value, editingTaskId = null){
    if (value.trim()==="") return false;

    if (manageTask.some(task => task.title.toLowerCase() === value.toLowerCase() && task.id !== editingTaskId)) {
        alert("Task already exists");
        return false;
    }
    return true;
}

// add task

export function addTask(value){
    const taskDetails = {
        id : id++,
        title : value,
        createdAt : Date.now(),
        completed : false
    };
    manageTask.unshift(taskDetails);
    saveTask();
}

// delete Task

export function deleteTask(id){

    const deletedTask = manageTask.find(task => task.id === id);

    if(deletedTask){

        trashTasks.unshift(deletedTask);

        saveTrash();
    }

    manageTask = manageTask.filter(task => task.id !== id);

    saveTask();
}

export function getTrashTasks(){
    return trashTasks;
}

export function restoreTask(id){

    const restoredTask = trashTasks.find(task => task.id === id);

    if(restoredTask){

        manageTask.unshift(restoredTask);

        saveTask();
    }

    trashTasks = trashTasks.filter(task => task.id !== id);

    saveTrash();
}

export function deleteTrashTask(id){

    trashTasks = trashTasks.filter(task => task.id !== id);

    saveTrash();
}

export function deleteAllTask(){

   // move all tasks into trash
   trashTasks = [...manageTask, ...trashTasks];

   // save trash
   saveTrash();

   // clear active tasks
   manageTask = [];

   // save active tasks
   saveTask();
}

export function editTask(id,newTitle){
   manageTask =  manageTask.map(task=>{
     if (task.id === id) {
        return {
            ...task,
            title: newTitle
        };
    }
    return task;
   });
   saveTask();
}

export function toggleTask(id){

    manageTask = manageTask.map(task => {

        if(task.id === id){

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });
    saveTask();
}



export function getTask(){
    return manageTask;
}


const STORAGE_KEYs = "theme";
let currentTheme = "light";

// getitem

function getItem(){
    return currentTheme;
}


//  setitem

function setItem(theme){
    currentTheme = theme;
}

// save theme

function saveTheme(theme){
    localStorage.setItem(STORAGE_KEYs,theme);
}

function loadTheme(){
    const storedTheme = localStorage.getItem(STORAGE_KEYs);
    if (storedTheme) {
        currentTheme = storedTheme;
    }
    return currentTheme;
}

export {
    getItem,
    setItem,
    saveTheme,
    loadTheme
};


