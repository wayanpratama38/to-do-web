const todos = [];
const RENDER_EVENT = "render-todo";

function generateID(){
    return +new Date();
    
};

function generateToDoObject(id,title,date,isCompleted){
    return {
        id,
        title,
        date,
        isCompleted,
    };
};

function addTodo(){
    const inputTitle = document.getElementById("title").value;
    const inputDate = document.getElementById("date").value;

    const generatedID = generateID();
    const todoObject = generateToDoObject(generatedID,inputTitle,inputDate,false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    document.addEventListener(RENDER_EVENT,function(){
        const uncompletedTODOList = document.getElementById("todos");
        uncompletedTODOList.innerHTML = "";    
        
        for(const todoItem of todos){
            const todoElement = makeToDo(todoItem);
            if(!todoItem.isCompleted){
                uncompletedTODOList.append(todoElement);
            }
        }
    });
};

function findToDoId(todoId){
    for(const todo of todos){
        if(todo.id === todoId){
            return todoItem;
        }
    }
    return null;
}

function addTaskToCompleted(todoId){
    const todoTarget = findToDoId(todoId);

    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    
}

function makeToDo(todoObject){
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.title;

    const textDate = document.createElement("p");
    textDate.innerText = todoObject.date;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle,textDate);

    const container = document.createElement("div");
    container.classList.add('item',"shadow");
    container.append(textContainer);
    container.setAttribute('id',`todo-${todoObject.id}`);

    if(todoObject.isCompleted){
        const undoButton = document.createElement("button");
        undoButton.classList.add("undo-button");

        undoButton.addEventListener("click",function(){
            undoTaskFromCompleted(todoObject.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-button");

        trashButton.addEventListener('click',function(){
            removeTaskFromCompleted(todoObject.id);
        });

        container.append(undoButton,trashButton);
    }else{
        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");

        checkButton.addEventListener("click",function(){
            addTaskToCompleted(todoObject.id);
        });

        container.append(checkButton);
    }
    return container;
}

document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit",function(event){
        event.preventDefault();
        addTodo();
    });
});