//as soon as dom content loaded
document.addEventListener('DOMContentLoaded',()=>{
    const todoInput=document.getElementById("todo-input")
const addTaskBtn=document.getElementById("add-task-btn")
const todoList=document.getElementById("todo-list")

let tasks=JSON.parse(localStorage.getItem('todo'))||[];

tasks.forEach((task)=>renderTask(task))

addTaskBtn.addEventListener('click',()=>{
    const inputVal=todoInput.value.trim();
    if(inputVal=="")return;

    const newTask={
        id:Date.now(),
        name: inputVal,
        completed:false
    }
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value="";
    console.log(tasks);
})

//render task
function renderTask(task){
    const li=document.createElement('li');
    li.setAttribute('data-id',task.id);
    if(task.completed) li.classList.add("completed");

    li.innerHTML=`
    <span>${task.name}</span>
    <button>delete</button>
    `;

    li.addEventListener("click",(e)=>{
        if(e.target.tagName ==='BUTTON')return;
        task.completed=!task.completed;
        li.classList.toggle('completed');
        saveTasks();
    });

    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation()
        tasks=tasks.filter(t=> t.id!==task.id)
        li.remove()
        saveTasks()
    })

   todoList.append(li);
    
} 


//saving to local storage
function saveTasks(){
    localStorage.setItem('todo',JSON.stringify(tasks));
}
})