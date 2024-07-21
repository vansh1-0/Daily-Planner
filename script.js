// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadJournalForDate(); // Load journal for the current date on page load
    loadGoals(); // Load goals from local storage
    renderCalendar();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            ${task.text}
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function saveJournal() {
    const journalDateInput = document.getElementById('journalDateInput');
    const journalDate = journalDateInput.value || new Date().toISOString().split('T')[0]; // Default to today if no date selected
    const journalEntry = document.getElementById('journalEntry').value.trim();
    
    if (journalDate === '' || journalEntry === '') return;
    
    const journals = JSON.parse(localStorage.getItem('journals')) || {};
    journals[journalDate] = journalEntry;
    localStorage.setItem('journals', JSON.stringify(journals));
    document.getElementById('journalEntry').value = '';
    loadJournalForDate();
}

function loadJournalForDate() {
    const journalDateInput = document.getElementById('journalDateInput');
    const journalDate = journalDateInput.value || new Date().toISOString().split('T')[0]; // Default to today if no date selected
    const journalEntries = document.getElementById('journalEntries');
    
    const journals = JSON.parse(localStorage.getItem('journals')) || {};
    
    journalEntries.innerHTML = '';
    
    if (journals[journalDate]) {
        journalEntries.innerHTML = `<strong>${journalDate}</strong><p>${journals[journalDate]}</p>`;
    } else {
        journalEntries.innerHTML = `<p>No journal entry for ${journalDate}</p>`;
    }
}

function renderCalendar() {
    const calendarView = document.getElementById('calendarView');
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    let calendarHtml = '<table><thead><tr>';
    
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        calendarHtml += `<th>${day}</th>`;
    });
    
    calendarHtml += '</tr></thead><tbody><tr>';
    
    for (let i = 0; i < firstDay; i++) {
        calendarHtml += '<td></td>';
    }
    
    for (let date = 1; date <= lastDate; date++) {
        calendarHtml += `<td><a href="#" onclick="setDateForJournal(${date})">${date}</a></td>`;
        
        if ((date + firstDay) % 7 === 0) {
            calendarHtml += '</tr><tr>';
        }
    }
    
    calendarHtml += '</tr></tbody></table>';
    calendarView.innerHTML = calendarHtml;
}

function setDateForJournal(date) {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();
    
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    
    document.getElementById('journalDateInput').value = formattedDate;
    loadJournalForDate();
}

function uploadTimetable() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select an image file.');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        displayTimetable(imageUrl);
    };
    
    reader.readAsDataURL(file);
}

function displayTimetable(imageUrl) {
    const timetableView = document.getElementById('timetableView');
    timetableView.innerHTML = `<img src="${imageUrl}" alt="Timetable Image" style="max-width: 100%; height: auto;">`;
}

function addGoal() {
    const goalInput = document.getElementById('goalInput');
    const goalText = goalInput.value.trim();
    
    if (goalText === '') return;
    
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push({ text: goalText, completed: false });
    localStorage.setItem('goals', JSON.stringify(goals));
    goalInput.value = '';
    loadGoals();
}

function loadGoals() {
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = '';
    
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    
    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${goal.completed ? 'checked' : ''} onclick="toggleGoal(${index})">
            ${goal.text}
            <button onclick="deleteGoal(${index})">Delete</button>
        `;
        goalList.appendChild(li);
    });
}

function toggleGoal(index) {
    const goals = JSON.parse(localStorage.getItem('goals'));
    goals[index].completed = !goals[index].completed;
    localStorage.setItem('goals', JSON.stringify(goals));
    loadGoals();
}

function deleteGoal(index) {
    const goals = JSON.parse(localStorage.getItem('goals'));
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    loadGoals();
}
