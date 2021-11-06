
const addNewButton = document.getElementById("addNew");
const inputNewText = document.getElementById("inputNew");
const submitNewButton = document.getElementById("submitNew");
const cancelNewButton = document.getElementById("cancelNewButton");
const activeTasksDiv = document.getElementById("activeTasks");
const doneTasksDiv = document.getElementById("doneTasks");

let activeTasks = [];
let doneTasks = [];


if ("activeTasks" in localStorage && "doneTasks" in localStorage) {
    activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
    doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
    appendChanges();
}


addEventListener("click", function (event) {
    let action = event.target.dataset.action;
    let index = event.target.dataset.index;
    let id = event.target.id;
    if (action == "delete") {
        if (event.target.parentNode.classList.contains("taskDiv")) {
            deleteTask(activeTasks, index);
        } else if (event.target.parentNode.classList.contains("taskDoneDiv")) {
            deleteTask(doneTasks, index);
        }

    } else if (action == "edit") {
        setCursorTask(event.target.previousSibling);

    } else if (action == "check" || action == "uncheck") {
        toggleTaskCheckBox(index, action);
    } else if (id === "submitNew") {

        let newTaskText = inputNewText.value;
        addNewTask(newTaskText);
        inputNewText.value = null;

    }

});



function toggleTaskCheckBox(index, checkOrUnCheck) {
    let arrayToAttach;
    let arrayToDetach;
    let checkedElem;
    if (checkOrUnCheck == "check") {
        arrayToAttach = doneTasks;
        arrayToDetach = activeTasks;
        isDone = true;
    } else if (checkOrUnCheck == "uncheck") {
        arrayToAttach = activeTasks;
        arrayToDetach = doneTasks;
        isDone = false;
    }
    checkedElem = arrayToDetach[index];
    arrayToAttach.unshift(checkedElem);
    arrayToDetach.splice(index, 1);
    appendChanges();

}


addEventListener("focusout", function (event) {

    if (event.target.classList.contains("task") && !(event.target.hasAttribute("readonly"))) {
        if (event.target.classList.contains("done")) {
            doneTasks[event.target.dataset.index] = event.target.value;

        } else {
            activeTasks[event.target.dataset.index] = event.target.value;
        }

        appendChanges();
    }
});

addEventListener("keypress", function (event) {

    if ((event.key === "Enter") && (event.target.id === "inputNew")) {

        let newTaskText = inputNewText.value;
        addNewTask(newTaskText);
        inputNewText.value = null;

    } else if ((event.key === 'Enter') && (event.target.classList.contains("task")) && !(event.target.hasAttribute("readonly"))) {

        event.target.blur();

    }

});


function deleteTask(arrayTasks, index) {
    arrayTasks.splice(index, 1);
    appendChanges();
}

function setCursorTask(elem) {

    elem.removeAttribute("readonly");
    let cursorPos = elem.value.length;
    elem.setSelectionRange(cursorPos, cursorPos)
    elem.focus();

}


function addNewTask(newTaskText, isDone = true, index = 0) {
    arrayToAdd = isDone ? activeTasks : doneTasks;

    arrayToAdd.unshift(newTaskText);

    appendChanges();
}

function createTaskElement(value, index, isDone = false) {

    let newElem = document.createElement('input');
    newElem.type = "text";
    newElem.classList = isDone ? "task done" : "task";
    newElem.setAttribute("readonly", true);
    newElem.value = value;
    return newElem;
}



function appendChanges() {
    let arrayNewTasks = [];
    activeTasks.forEach((item, index, array) => {

        let newTaskDiv = document.createElement('div');
        newTaskDiv.classList = "taskDiv";
        newTaskDiv.dataset.index = index;

        let newCheckInput = document.createElement('input');
        newCheckInput.type = "checkbox";
        newCheckInput.dataset.index = index;
        newCheckInput.dataset.action = "check";

        let newInputElem = document.createElement('input');
        newInputElem.type = "text";
        newInputElem.classList = "task";
        newInputElem.setAttribute("readonly", true);
        newInputElem.dataset.index = index;
        newInputElem.value = item;


        let newEditButton = document.createElement('input');
        newEditButton.type = "button";
        newEditButton.value = "Edit";
        newEditButton.dataset.index = index;
        newEditButton.dataset.action = "edit";

        let newDeleteButton = document.createElement('input');
        newDeleteButton.type = "button";
        newDeleteButton.value = "Delete";
        newDeleteButton.dataset.index = index;
        newDeleteButton.dataset.action = "delete";

        newTaskDiv.append(newCheckInput, newInputElem, newEditButton, newDeleteButton);

        arrayNewTasks.push(newTaskDiv);

    })
    activeTasksDiv.innerHTML = "";
    activeTasksDiv.append(...arrayNewTasks);

    let arrayDoneTasks = [];
    doneTasks.forEach((item, index, array) => {

        let newTaskDiv = document.createElement('div');
        newTaskDiv.classList = "taskDoneDiv";
        newTaskDiv.dataset.index = index;

        let newCheckInput = document.createElement('input');
        newCheckInput.type = "checkbox";
        newCheckInput.dataset.index = index;
        newCheckInput.dataset.action = "uncheck";

        let newInputElem = document.createElement('input');
        newInputElem.type = "text";
        newInputElem.classList = "task done";
        newInputElem.setAttribute("readonly", true);
        newInputElem.dataset.index = index;
        newInputElem.value = item;

        let newEditButton = document.createElement('input');
        newEditButton.type = "button";
        newEditButton.value = "Edit";
        newEditButton.dataset.index = index;
        newEditButton.dataset.action = "edit";

        let newDeleteButton = document.createElement('input');
        newDeleteButton.type = "button";
        newDeleteButton.value = "Delete";
        newDeleteButton.dataset.index = index;
        newDeleteButton.dataset.action = "delete";

        newTaskDiv.append(newCheckInput, newInputElem, newEditButton, newDeleteButton);

        arrayDoneTasks.push(newTaskDiv);

    })
    doneTasksDiv.innerHTML = "";
    doneTasksDiv.append(...arrayDoneTasks);

    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));


}