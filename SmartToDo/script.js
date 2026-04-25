const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const dateDisplay = document.getElementById('date-today');

// 1. Ipakita ang petsa
const options = { weekday: 'long', month: 'long', day: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

// 2. KUNIN ANG DATA MULA SA MEMORY (LocalStorage)
// JSON.parse - binabalik ang string para maging "Array" ulit.
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. FUNCTION PARA I-RENDER (IPAKITA) ANG MGA TASKS
function renderTasks() {
    taskList.innerHTML = ""; // Linisin muna ang listahan

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(li);
    });

    // I-save sa memory tuwing may nagbabago
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// 4. FUNCTION PARA MAGDAGDAG NG TASK
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return alert("Write something!");

    // Gagawa tayo ng "Object" para sa bawat task
    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask); // Idagdag sa Array
    taskInput.value = ""; // Linisin ang input
    renderTasks(); // I-refresh ang display
}

// 5. FUNCTION PARA I-DELETE
function deleteTask(index) {
    tasks.splice(index, 1); // Tanggalin ang item sa array base sa position (index)
    renderTasks();
}

// 6. FUNCTION PARA I-CHECK (DONE)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Pag binaligtad ang status (true/false)
    renderTasks();
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Unang load ng page, ipakita ang mga naka-save
renderTasks();