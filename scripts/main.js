loadPage();

function loadPage(){

const inputNewText = document.getElementById("inputNew");
const submitNewButton = document.getElementById("submitNew");
const activeTasksDiv = document.getElementById("activeTasks");
const doneTasksDiv = document.getElementById("doneTasks");

let activeTasks = [];
let doneTasks = [];


if ("activeTasks" in localStorage && "doneTasks" in localStorage) {
    activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
    doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
    appendChanges();
}




addEventListener("click", event =>{
    if (event.target.dataset.action === "delete") {
        if (event.target.parentNode.classList.contains("taskDiv")) {
            deleteTask(activeTasks, event.target.dataset.index);
        } else  {         
               deleteTask(doneTasks, event.target.dataset.index);
        }
    }

});

addEventListener("click", event =>{

    if (event.target.dataset.action === "edit") {
        setCursorTask(event.target.parentNode.getElementsByClassName("task")[0]);
    }
});

addEventListener("click", event =>{

    if (event.target.dataset.action === "check" || event.target.dataset.action === "uncheck") {
        toggleTaskCheckBox(event.target.dataset.index, event.target.dataset.action);
    } 
});

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


submitNewButton.addEventListener("click", event => {
    addNewTask();
});

submitNewButton.addEventListener("keypress", event=> {
    if (event.key === "Enter"){ 
        addNewTask();
    }

});

addEventListener("keypress", event => {

    if (
        (event.key === 'Enter') &&
        (event.target.classList.contains("task")) &&
        !(event.target.hasAttribute("readonly"))) {

            event.target.blur();
    }

});


function toggleTaskCheckBox(index, checkOrUnCheck) {

    if (checkOrUnCheck === "check") {

        doneTasks.unshift(activeTasks[index]);
        activeTasks.splice(index, 1);
    } else  {
 
        activeTasks.unshift(doneTasks[index]);
        doneTasks.splice(index, 1);
    }
  
    appendChanges();

}


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


function addNewTask() {
    
    activeTasks.unshift(inputNewText.value);
    inputNewText.value = null;
    appendChanges();
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
        newCheckInput.checked = true;
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
}

