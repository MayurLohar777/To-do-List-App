import {  
    handleDeleteTask, 
    handleEditTask, 
    handlePermanentDelete, 
    handleRestoreTask, 
    handleToggleTask 
} from "../controller/controller.js";

/**
 * Renders the Active Task List on the screen
 * @param {Array} tasks - Array of active tasks from the model
 */
export function renderTask(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Toggle Active Empty State View
    const emptyState = document.getElementById("activeEmptyState");
    if (tasks.length === 0) {
        emptyState.classList.remove("hide");
    } else {
        emptyState.classList.add("hide");
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) {
            li.classList.add("task-completed-card");
        }
        
        // Add step animation delay
        li.style.animationDelay = `${index * 0.05}s`;

        // Task Content Column (Checkbox, Title, Time)
        const contentCol = document.createElement("div");
        contentCol.classList.add("task-content-left");

        // Custom Checklist Label & Input
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("custom-checkbox-container");

        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.classList.add("task-checkbox");
        checkboxInput.checked = task.completed;
        
        const checkmark = document.createElement("span");
        checkmark.classList.add("custom-checkmark");
        checkmark.innerHTML = '<i class="ri-check-line"></i>';

        checkboxLabel.append(checkboxInput, checkmark);

        // Task Text and Meta
        const textContainer = document.createElement("div");
        textContainer.classList.add("task-text-container");

        const title = document.createElement("span");
        title.classList.add("task-title-text");
        title.textContent = task.title;
        if (task.completed) {
            title.classList.add("completed");
        }

        // Format Date Pill
        const timePill = document.createElement("span");
        timePill.classList.add("task-time-pill");
        
        const timeString = new Date(task.createdAt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const dateString = new Date(task.createdAt).toLocaleDateString([], {
            month: 'short',
            day: 'numeric'
        });
        
        timePill.innerHTML = `<i class="ri-time-line"></i> ${dateString}, ${timeString}`;

        textContainer.append(title, timePill);
        contentCol.append(checkboxLabel, textContainer);

        // Actions Button Column (Edit & Delete)
        const actionsCol = document.createElement("div");
        actionsCol.classList.add("task-actions-right");

        // Edit Button (Circular Glass)
        const editBtn = document.createElement("button");
        editBtn.classList.add("btn-action-circle", "btn-edit-glass");
        editBtn.innerHTML = '<i class="ri-edit-line"></i>';
        editBtn.setAttribute("aria-label", "Edit task");
        editBtn.setAttribute("title", "Edit Task");

        // Delete Button (Circular Glass)
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn-action-circle", "btn-delete-glass");
        deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
        deleteBtn.setAttribute("aria-label", "Delete task");
        deleteBtn.setAttribute("title", "Delete Task");

        // Event Hookups
        checkboxInput.addEventListener("change", () => {
            // Add a scale pop effect on click
            checkmark.classList.add("pop-animation");
            setTimeout(() => {
                handleToggleTask(task.id);
            }, 180);
        });

        editBtn.addEventListener("click", () => {
            handleEditTask(task.id, task.title);
        });

        deleteBtn.addEventListener("click", () => {
            // Apply scale down slide out animation before state change
            li.classList.add("deleting-effect");
            setTimeout(() => {
                handleDeleteTask(task.id);
            }, 300);
        });

        actionsCol.append(editBtn, deleteBtn);
        li.append(contentCol, actionsCol);
        taskList.append(li);
    });
}

/**
 * Renders the Trashed Task List on the screen
 * @param {Array} tasks - Array of trashed tasks from the model
 */
export function renderTrashTasks(tasks) {
    const trashList = document.getElementById("trashList");
    trashList.innerHTML = "";

    // Toggle Trash Empty State View
    const emptyState = document.getElementById("trashEmptyState");
    if (tasks.length === 0) {
        emptyState.classList.remove("hide");
    } else {
        emptyState.classList.add("hide");
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item", "trash-task-item");
        li.style.animationDelay = `${index * 0.05}s`;

        // Task Content
        const contentCol = document.createElement("div");
        contentCol.classList.add("task-content-left");

        const textContainer = document.createElement("div");
        textContainer.classList.add("task-text-container");

        const title = document.createElement("span");
        title.classList.add("task-title-text", "trashed-text");
        title.textContent = task.title;

        const deletedBadge = document.createElement("span");
        deletedBadge.classList.add("task-time-pill", "danger-pill");
        deletedBadge.innerHTML = '<i class="ri-delete-bin-7-line"></i> Archived';

        textContainer.append(title, deletedBadge);
        contentCol.append(textContainer);

        // Actions (Restore & Permanent Delete)
        const actionsCol = document.createElement("div");
        actionsCol.classList.add("task-actions-right");

        // Restore Button
        const restoreBtn = document.createElement("button");
        restoreBtn.classList.add("btn-action-circle", "btn-restore-glass");
        restoreBtn.innerHTML = '<i class="ri-history-line"></i>';
        restoreBtn.setAttribute("aria-label", "Restore task");
        restoreBtn.setAttribute("title", "Restore Task");

        // Permanent Delete Button
        const permanentDeleteBtn = document.createElement("button");
        permanentDeleteBtn.classList.add("btn-action-circle", "btn-permanent-delete-glass");
        permanentDeleteBtn.innerHTML = '<i class="ri-close-circle-line"></i>';
        permanentDeleteBtn.setAttribute("aria-label", "Permanently delete task");
        permanentDeleteBtn.setAttribute("title", "Delete Permanently");

        // Event Hookups
        restoreBtn.addEventListener("click", () => {
            li.classList.add("restoring-effect");
            setTimeout(() => {
                handleRestoreTask(task.id);
            }, 300);
        });

        permanentDeleteBtn.addEventListener("click", () => {
            li.classList.add("permanent-delete-effect");
            setTimeout(() => {
                handlePermanentDelete(task.id);
            }, 300);
        });

        actionsCol.append(restoreBtn, permanentDeleteBtn);
        li.append(contentCol, actionsCol);
        trashList.append(li);
    });
}

/**
 * Updates the metrics widgets / SaaS statistics dashboard at the top
 * @param {Array} activeTasks - List of active tasks
 * @param {Array} trashTasks - List of trashed tasks
 */
export function updateStats(activeTasks, trashTasks) {
    const totalCount = activeTasks.length;
    const completedCount = activeTasks.filter(t => t.completed).length;
    const pendingCount = totalCount - completedCount;
    const trashCount = trashTasks.length;

    // Elements
    const totalBadge = document.getElementById("totalTasksBadge");
    const completedBadge = document.getElementById("completedTasksBadge");
    const pendingBadge = document.getElementById("pendingTasksBadge");
    const trashBadge = document.getElementById("trashTasksBadge");

    if (totalBadge) totalBadge.textContent = totalCount;
    if (completedBadge) completedBadge.textContent = completedCount;
    if (pendingBadge) pendingBadge.textContent = pendingCount;
    if (trashBadge) trashBadge.textContent = trashCount;
}

// DOM Cache for Theme
const body = document.body;
const themeBtn = document.getElementById("themeBtn");

/**
 * Toggles class names on body and animates floating button sun/moon icons
 * @param {string} theme - 'light' or 'dark'
 */
export function renderTheme(theme) {
    body.classList.remove("light", "dark");
    body.classList.add(theme);

    if (theme === "dark") {
        themeBtn.classList.add("dark-mode-active");
    } else {
        themeBtn.classList.remove("dark-mode-active");
    }
}

/**
 * Binds the click handler to the floating glassmorphism theme switcher
 * @param {Function} handlerFunction - Theme switch event handler
 */
export function themeBindToggle(handlerFunction) {
    if (themeBtn) {
        themeBtn.addEventListener("click", handlerFunction);
    }
}
