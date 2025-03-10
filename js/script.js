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
        console.log(todos);
    });
};

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

    return container;
}

document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit",function(event){
        event.preventDefault();
        addTodo();
    });
});