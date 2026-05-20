import { 
    addTask, 
    deleteAllTask, 
    deleteTask, 
    deleteTrashTask, 
    editTask, 
    getItem, 
    getTask, 
    getTrashTasks, 
    loadTheme, 
    restoreTask, 
    saveTheme, 
    setItem, 
    toggleTask, 
    validateTask 
} from "../model/model.js";

import { 
    renderTask, 
    renderTheme, 
    renderTrashTasks, 
    themeBindToggle, 
    updateStats 
} from "../view/view.js";

// DOM Elements Selection
const inputTask = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterSelect = document.getElementById("filterSelect");

// Controller State
let editingTaskId = null;

/**
 * Handles adding a new task or saving an edited task
 */
function handleAddTask() {
    const value = inputTask.value.trim();
    
    // Validate the task text (checking duplication, empty values)
    if (!validateTask(value, editingTaskId)) return;

    if (editingTaskId !== null) {
        // Edit Mode: Update existing task
        editTask(editingTaskId, value);
        editingTaskId = null;
        addBtn.innerHTML = '<i class="ri-add-line"></i> Add Task';
        addBtn.classList.remove("save-mode");
    } else {
        // Add Mode: Insert new task
        addTask(value);
    }

    inputTask.value = "";
    
    // Reset filters to "all" to ensure user sees their new/edited task
    if (filterSelect) {
        filterSelect.value = "all";
    }

    const tasks = getTask();
    const trash = getTrashTasks();
    
    renderTask(tasks);
    updateStats(tasks, trash);
}

/**
 * Handles moving all tasks to the trash
 */
function handleDeleteAllTask() {
    deleteAllTask();
    
    const tasks = getTask();
    const trash = getTrashTasks();

    renderTask(tasks);
    renderTrashTasks(trash);
    updateStats(tasks, trash);
}

/**
 * Puts a task in Edit Mode, populating the input field
 */
export function handleEditTask(id, title) {
    inputTask.value = title;
    editingTaskId = id;
    addBtn.innerHTML = '<i class="ri-save-line"></i> Save';
    addBtn.classList.add("save-mode");
    inputTask.focus();
}

/**
 * Handles toggling the completion status of a task
 */
export function handleToggleTask(id) {
    toggleTask(id);
    
    const tasks = getTask();
    const trash = getTrashTasks();

    // Re-render task list (maintains active filters if necessary)
    if (filterSelect) {
        triggerFilterRender(filterSelect.value);
    } else {
        renderTask(tasks);
    }
    
    updateStats(tasks, trash);
}

/**
 * Handles moving a task to trash
 */
export function handleDeleteTask(id) {
    deleteTask(id);

    const tasks = getTask();
    const trash = getTrashTasks();

    // Re-render based on current filter selection
    if (filterSelect) {
        triggerFilterRender(filterSelect.value);
    } else {
        renderTask(tasks);
    }
    
    renderTrashTasks(trash);
    updateStats(tasks, trash);
}

/**
 * Restores a task from the trash back to active
 */
export function handleRestoreTask(id) {
    restoreTask(id);

    const tasks = getTask();
    const trash = getTrashTasks();

    renderTask(tasks);
    renderTrashTasks(trash);
    updateStats(tasks, trash);
}

/**
 * Permanently deletes a task from the trash
 */
export function handlePermanentDelete(id) {
    // Elegant confirmation could go here, but doing it directly for smooth UX
    deleteTrashTask(id);

    const tasks = getTask();
    const trash = getTrashTasks();

    renderTrashTasks(trash);
    updateStats(tasks, trash);
}

/**
 * Helper to render task list based on a specific filter value
 */
function triggerFilterRender(filterValue) {
    const tasks = getTask();
    if (filterValue === "all") {
        renderTask(tasks);
    } else if (filterValue === "completed") {
        renderTask(tasks.filter(task => task.completed));
    } else if (filterValue === "pending") {
        renderTask(tasks.filter(task => !task.completed));
    }
}

/**
 * Filters task list in real-time as user changes the filter dropdown
 */
function handleFilterTask(e) {
    triggerFilterRender(e.target.value);
}

/**
 * Live search filter
 */
function handleSearchTask() {
    // Avoid filtering/searching while the user is actively editing a task name
    if (editingTaskId !== null) return;

    const value = inputTask.value.toLowerCase().trim();
    const tasks = getTask();
    
    const filteredTask = tasks.filter(task =>
        task.title.toLowerCase().includes(value)
    );
   
    renderTask(filteredTask);
}

// Event Listeners Binding
if (filterSelect) {
    filterSelect.addEventListener("change", handleFilterTask);
}
if (inputTask) {
    inputTask.addEventListener("input", handleSearchTask);
}
if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", handleDeleteAllTask);
}
if (addBtn) {
    addBtn.addEventListener("click", handleAddTask);
    // Allow pressing Enter in input to trigger add/save
    inputTask.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    });
}

/**
 * Theme Toggling Handlers
 */
function handleThemeToggle() {
    const currentTheme = getItem();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setItem(newTheme);
    saveTheme(newTheme);
    renderTheme(newTheme);
}

function initThemeApp() {
    const savedTheme = loadTheme();
    renderTheme(savedTheme);
    themeBindToggle(handleThemeToggle);
}

export const themeController = {
    initThemeApp
};

// Initial Render and Stats Sync on Page Load
const initialTasks = getTask();
const initialTrash = getTrashTasks();

renderTask(initialTasks);
renderTrashTasks(initialTrash);
updateStats(initialTasks, initialTrash);
