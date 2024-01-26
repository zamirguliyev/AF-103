let taskInput = document.getElementById('task');
let addButton = document.getElementById('add');
let taskList = document.getElementById('taskList');
let clearAllButton = document.getElementById('clearAll');

addButton.addEventListener('click', function () {
    let taskText = taskInput.value;
    if (taskText.trim() !== '') {
        let li = document.createElement('li');
        li.innerHTML = `
                ${taskText}
               <div>
               <button class="delete">Delete</button>
               <button class="complete">Complete</button>
               </div>
            `;
        taskList.appendChild(li);
        taskInput.value = '';
        updateTaskCount();
    }
    else {
        let span = document.querySelector('span')
        span.style.display = "block"
        span.style.visibility = "visible"
    }
});


taskList.addEventListener('click', function (e) {
    if (e.target && e.target.className === 'delete') {
        window.confirm("are you sure ti do delete")
        e.target.parentElement.parentElement.remove();
        updateTaskCount();
    }
});

taskList.addEventListener('click', function (e) {
    if (e.target && e.target.className === 'complete') {
        e.target.parentElement.parentElement.style.textDecoration = 'line-through';
    }
})


clearAllButton.addEventListener('click', function () {
    if (window.confirm("are you sure all to do items?")) {
        taskList.innerHTML = '';
        updateTaskCount();
    }
});

clearAllButton.addEventListener('click', function () {
    if (window.confirm("are you sure all to do items?")) {
        taskList.innerHTML = '';
        updateTaskCount();
    }
});

function updateTaskCount() {
    let count = taskList.getElementsByTagName('li').length;
    document.querySelector('#taskCount span').textContent = count;
}

