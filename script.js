const $one = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const searchBar = $one('#search-bar');
const taskList = $one('#task-list');

// Carica le task salvate all'avvio
document.addEventListener('DOMContentLoaded', loadTasks());

// Aggiungi task con Invio
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Rimuovi task
taskList.addEventListener('click', removeTask);

function addTask() {
    const priority = $one('#priority-select').value;
    let task = searchBar.value.trim();
    if (!task) return;

    let priorityTag;
    switch (priority) {
        case 'high': priorityTag = 'bg-red-600'; break;
        case 'medium': priorityTag = 'bg-orange-600'; break;
        case 'low': priorityTag = 'bg-green-600'; break;
        default: priorityTag = 'bg-blue-600';
    }

    const li = document.createElement('li');
    li.className = 'text-center flex justify-between items-center p-4 border rounded-xl hover:bg-slate-200 transition-all';
    li.innerHTML = `
        <span class="rounded-full ${priorityTag} h-[25px] w-[25px]"></span>
        <h3>${task}</h3>
        <button class="delete-task bg-slate-400 border rounded-lg p-2 cursor-pointer hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    `;

    taskList.appendChild(li);
    addLocalStorage();
    searchBar.value = "";
}

function addLocalStorage() {
    const tasks = [];
    $all('li').forEach(item => {
        tasks.push({
            text: item.querySelector('h3').textContent,
            priority: item.querySelector('span').classList.contains('bg-red-600') ? 'high' :
                item.querySelector('span').classList.contains('bg-orange-600') ? 'medium' :
                    item.querySelector('span').classList.contains('bg-green-600') ? 'low' : 'default'
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) return;

    JSON.parse(savedTasks).forEach(task => {
        searchBar.value = task.text;
        $one('#priority-select').value = task.priority;
        addTask();
        searchBar.value = "";
    });
}