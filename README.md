⚡ To-Do List App

A clean and practical task management application built with JavaScript to help users organize daily work smoothly.

This project is more than just adding and deleting tasks — it focuses on real-world task handling like search, storage management, theme switching, and better user interaction.

🧩 What is this?

This is a modern To-Do List application where users can:

Add tasks
Delete tasks
Search tasks instantly
Store tasks in localStorage
Switch between themes
Manage tasks dynamically without refreshing the page

The main goal of this project was to improve DOM manipulation, localStorage handling, modular JavaScript thinking, and UI interaction.

🚀 Features

➕ Add new tasks
🗑 Delete individual tasks
🧹 Delete all tasks
🔍 Live task search
💾 localStorage support
🌙 Dark / Light mode toggle
⚡ Instant UI updates
📱 Responsive design
🎯 Simple and clean interface


⚙️ How it works

Tasks are stored inside an array and synchronized with localStorage.

Example logic:

function saveTask() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(manageTask));
}

Whenever a task is added, deleted, or updated, the UI automatically re-renders and saves the latest data.
This keeps the application fast and reactive without needing a backend.

🧠 What I focused on

Managing state using arrays
DOM manipulation
Reusable functions
localStorage integration
Real-time search filtering
Theme handling
Writing cleaner and scalable JavaScript

🌐 Live Demo
=>  to-do-list-app-taupe-gamma.vercel.app

👉 To-Do List App Live Demo

🛠 Tech Stack
HTML5
CSS3
JavaScript (ES6+)
localStorage API

📸 Preview

<img width="1904" height="893" alt="image" src="https://github.com/user-attachments/assets/541aa52f-f251-4f51-936f-17fbb9d2fcfd" />


💭 Why I built this

To move beyond beginner JavaScript projects and understand how real applications manage UI updates, data persistence, and user interactions.
This project helped me practice building structured frontend logic instead of only static interfaces.

🔮 Future Improvements

✏️ Edit task functionality
📌 Task completion status
🕒 Due date support
🔔 Reminder notifications
☁️ Backend database integration
📊 Task categories & filters
🎨 Better animations and UI polish

👨‍💻 Author
Mayur Malviya
