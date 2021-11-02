
const addNewButton = document.getElementById("addNew");
const inputNewText = document.getElementById("inputNew");
const submitNewButton = document.getElementById("submitNew");
const cancelNewButton = document.getElementById("cancelNewButton");
const activeTasksDiv = document.getElementById("activeTasks");
const doneTasksDiv = document.getElementById("doneTasks");

let activeTasks = [];
let doneTaks = [];

/*
if ("activeTasks" in localStorage && "doneTasks" in localStorage ){
 activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
 doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
}
*/


// addEventListener("click",function(event){
// if (!event.target.classList.contains("task"))
// {    return;

// };
    // постановка курсора в конец
//     event.preventDefault();
//     // let cursorPos = event.target.value.length ;
//     // event.target.setSelectionRange(cursorPos,cursorPos)
//     // event.target.focus();
// });



addEventListener("click",function(event){
let action = event.target.dataset.action;
    if (action=="delete"){
        if (event.target.parentNode.classList.contains("taskDiv")){
            deleteTask(activeTasks, event.target.dataset.index);
        } else if (event.target.parentNode.classList.contains("taskDoneDiv")){
            deleteTask(doneTaks, event.target.dataset.index);
        }

    } else if (action=="edit"){
            setCursorTask(event.target.previousSibling);
       
    }
    
});

function deleteTask(arrayTasks, index){
    arrayTasks.splice(index,1);
    appendChanges();
}

function setCursorTask(elem){
    
        elem.removeAttribute("readonly");
        let cursorPos = elem.value.length ; 
        elem.setSelectionRange(cursorPos,cursorPos)
        elem.focus();

}

addEventListener("focusout", function(event){

if (event.target.classList.contains("task")&& !event.target.hasAttribute("readonly")){
    if (event.target.classList.contains("done")) {
        doneTaks[event.target.dataset.index].value = event.target.value;
        
    }else {
        activeTasks[event.target.dataset.index].value = event.target.value;
    }

    event.target.setAttribute("readonly", true)
}
} );

addEventListener("keypress", function(event){
    if (!((event.key === 'Enter')&& event.target.classList.contains("task")&& !event.target.hasAttribute("readonly"))) return;
    event.target.blur();
    // event.target.dispatchEvent(new Event("focusout"))
    
    
});


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
    activeTasks.unshift(createTaskElement(newTaskText));
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    appendChanges();
}

function createTaskElement(value, index, isDone = false)     {
    
    let newElem = document.createElement('input');
    newElem.type = "text";
    newElem.classList = isDone? "task done":"task";
    newElem.setAttribute("readonly", true);
    // newElem.dataset.index = index;
    newElem.value= value;
    return newElem;
}




















function appendChanges(){
    let arrayNewTasks = [];
    activeTasks.forEach((item, index, array) =>{
        item.dataset.index = index;

        let newTaskDiv = document.createElement('div');
        newTaskDiv.classList = "taskDiv";
        newTaskDiv.dataset.index = index;

        let newCheckInput = document.createElement('input');
        newCheckInput.type = "checkbox";
        newCheckInput.dataset.index = index;

        let newEditButton = document.createElement('input');
        newEditButton.type = "button";
        newEditButton.dataset.index = index;
        newEditButton.dataset.action = "edit";

        let newDeleteButton = document.createElement('input');
        newDeleteButton.type = "button";
        newDeleteButton.dataset.index = index;
        newDeleteButton.dataset.action = "delete";
        
        newTaskDiv.append(newCheckInput, item,newEditButton,newDeleteButton);
        
        arrayNewTasks.push(newTaskDiv);
       
     })
     activeTasksDiv.innerHTML ="";
     activeTasksDiv.append(...arrayNewTasks);

     let arrayDoneTasks = [];
     doneTaks.forEach((item, index, array) =>{
         item.dataset.index = index;
 
         let newTaskDiv = document.createElement('div');
         newTaskDiv.classList = "taskDoneDiv";
         newTaskDiv.dataset.index = index;
 
         let newCheckInput = document.createElement('input');
         newCheckInput.type = "checkbox";
         newCheckInput.dataset.index = index;
 
         let newEditButton = document.createElement('input');
         newEditButton.type = "button";
         newEditButton.dataset.index = index;
         newEditButton.dataset.action = "edit";
 
         let newDeleteButton = document.createElement('input');
         newDeleteButton.type = "button";
         newDeleteButton.dataset.index = index;
         newDeleteButton.dataset.action = "delete";
         
         newTaskDiv.append(newCheckInput, item,newEditButton,newDeleteButton);
         
         arrayDoneTasks.push(newTaskDiv);
        
      })
      doneTasksDiv.innerHTML ="";
      doneTasksDiv.append(...arrayDoneTasks);


}