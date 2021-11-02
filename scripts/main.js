
const addNewButton = document.getElementById("addNew");
const inputNewText = document.getElementById("inputNew");
const submitNewButton = document.getElementById("submitNew");
const cancelNewButton = document.getElementById("cancelNewButton");
const activeTasksDiv = document.getElementById("activeTasks");
const doneTasksDiv = document.getElementById("doneTasks");

let activeTasks = [];
let doneTaks = [];


if ("activeTasks" in localStorage && "doneTasks" in localStorage ){
 activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
 doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
}


addNewButton.onclick = function (){
    /*inputNewText.style.visibility = 'visible';
    addNewButton.style.visibility = 'hidden';*/
    let cursorPos = inputNewText.value.length ;
    inputNewText.setSelectionRange(cursorPos,cursorPos)
    inputNewText.focus();
}
submitNewButton.onclick = function(){
    addNewTask();
    inputNewText.value = null;
    

}

function addNewTask(){
    let newTaskText = inputNewText.value;
    activeTasks.push(newTaskText);
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    showChanges();
}

function showChanges(){
    let activeInputs = [];
    activeTasks.forEach((item, index, array) =>{
        let newElem = document.createElement('input');
        newElem.type = "text";
        newElem.className = "text";
        newElem.dataset.index = index;
        newElem.value= item;
        activeInputs.push(newElem);

     })
     activeTasksDiv.innerHTML ="";
     activeTasksDiv.append(...activeInputs);
     
     
     
     
     
     
     ;





}