const addBtn = document.querySelector('#Add-btn');
const newTaskInput = document.querySelector('#wrapper input');
const taskContainer = document.querySelector('#tasks');
const error = document.getElementById('error');
const countValue = document.querySelector('.count-value');

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = 'none';
    if (!taskName) {
        setTimeout(() => {
            error.style.display = 'block';
        }, 200);
        return;
    }

    const task = `
    <div class="task">
        <input type="checkbox" name="" id="" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>`;

    taskContainer.insertAdjacentHTML('beforeend', task);
    taskCount++;
    displayCount(taskCount);

    newTaskInput.value = '';

    updateButtons();
};

const updateButtons = () => {
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((item) => {
        item.onclick = () => {
            const taskElement = item.parentNode;
            const checkbox = taskElement.querySelector('.task-check');
            if (!checkbox.checked) {
                taskCount--;
            }
            taskElement.remove();
            displayCount(taskCount);
        };
    });

    let editButtons = document.querySelectorAll   ('.edit');
    editButtons.forEach((editButton) => {
        editButton.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == 'edit')) {
                targetElement = e.target.parentElement;// edit button
            }
            const taskElement = targetElement.parentNode;//main div .task
            const checkbox = taskElement.querySelector('.task-check');// input type checkbox
            if (!checkbox.checked) {
                taskCount--;
            }
            newTaskInput.value = targetElement.previousElementSibling.innerText;// wo value jo pahlay add thi or edit pr click kr ki wajasa input ma chalai gi taki user is value ko updat kar sakay;
            taskElement.remove();
            displayCount(taskCount);
        };
    });

    let taskCheck = document.querySelectorAll('.task-check');//input type checlbox
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle('completed');
            if (checkBox.checked) {
                taskCount--;
            } else {
                taskCount++;
            }
            displayCount(taskCount);
        };
    });

}
addBtn.addEventListener('click', addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = '';
};
