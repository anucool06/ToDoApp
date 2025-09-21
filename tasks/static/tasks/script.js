const API_URL = "/api/tasks/";

// ✅ Get CSRF token from <meta> tag in index.html
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

// ✅ Fetch and display all tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const tasks = await response.json();

        const list = document.getElementById("taskList");
        list.innerHTML = ""; // clear old list

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.title;

            // Add delete button
            const btn = document.createElement("button");
            btn.textContent = "✖";
            btn.style.marginLeft = "10px";
            btn.onclick = () => deleteTask(task.id);

            li.appendChild(btn);
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching tasks:", err);
    }
}

// ✅ Add new task
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return alert("Please enter a task");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken() // ✅ CSRF header added
            },
            body: JSON.stringify({ title: title, completed: false })
        });

        if (!response.ok) throw new Error("Failed to add task");

        input.value = "";
        fetchTasks();
    } catch (err) {
        console.error("Error adding task:", err);
    }
}

// ✅ Delete task by ID
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}${id}/`, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": getCSRFToken() // ✅ CSRF header added
            }
        });

        if (!response.ok) throw new Error("Failed to delete task");

        fetchTasks();
    } catch (err) {
        console.error("Error deleting task:", err);
    }
}

// ✅ Load tasks when page opens
fetchTasks();
