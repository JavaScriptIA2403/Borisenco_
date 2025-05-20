let tasks;
let  taskId;
const today = new Date();
if (localStorage.getItem('tasks'))
{
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
else 
{
    tasks = [];

}


if (tasks.length > 0) 
{
  
    let allIds = [];

    for (let i =0; i<tasks.length; i++)
    {
        allIds.push(tasks[i].id)
    }

  
  let maxId = Math.max(...allIds);
  taskId = maxId + 1;
} 
else 
{

  taskId = 1;
}


function AddTasc ()
{
    let nameOftasc = document.getElementById('task-title').value;
    let description = document.getElementById('task-description').value;
    let importance = document.getElementById('task-importance').value;
    let date = document.getElementById('task-date').value;


    if (!nameOftasc || !description || !importance || !date) 
    {
        alert("Пожалуйста, заполните все поля!");
        return;
    }
    
    if(importance>10 )
    {
        importance = 10;
    }
    else if (importance<0)
    {
        importance = 0;
    }
    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) 
        {
        alert("Нельзя выбрать прошедшую дату!");
        document.getElementById('task-date').value = '';
        return;
    }

    const task = 
    {
        name: nameOftasc,
        description :description,
        importance : importance,
        date: date, 
        id : taskId

    }
    taskId++;
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    ReloadPageInfo();
    ClearForm();
}


function ReloadPageInfo()
{
    let tascListEl = document.getElementById('task-list');
    tascListEl.innerHTML ='';
    

    tasks.sort(function(taskA, taskB) 
    {
        let importanceA = Number(taskA.importance);
        let importanceB = Number(taskB.importance);

        if (importanceA < importanceB)
        {
            return 1;
        } 
        else if (importanceA > importanceB) 
        {
            return -1; 
        } 
        else 
        {
            return 0; 
        }
    });

    for (let i = 0; i< tasks.length ; i++)
    {
        const taskDate = new Date(tasks[i].date);
        const timeDiff = taskDate - today;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));   

        const taskItem = document.createElement('div');
        

        if (daysDiff <= 2) 
        {
            taskItem.classList.add('red-tasc'); 
        }
        else 
        {
            taskItem.classList.add('normal-tasc');;    
        }    

        taskItem.innerHTML = `
            <h3>${tasks[i].name}</h3>
            <p><b>Описание:</b> ${tasks[i].description}</p>
            <p><b>Важность:</b> ${tasks[i].importance} / 10</p>
            <p><b>Дата выполнения:</b> ${tasks[i].date}</p>
            <button onclick="editTask(${tasks[i].id})">Редактировать</button>
            <button onclick="deleteTask(${tasks[i].id})">Удалить</button>  
            
    
        `;
        tascListEl.appendChild(taskItem);

    }

    

}

function ClearForm()
{
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-importance').value = '';
    document.getElementById('task-date').value = '';
}

function deleteTask(id)
{
    for (let i =0; i< tasks.length ; i++)
    {
        if (tasks[i].id === id)
        {
            tasks.splice(i,1);
            break;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    ReloadPageInfo();

}

function editTask(id)
{
    for (let i =0; i< tasks.length; i++)
    {
        if(tasks[i].id=== id  )
        {
            document.getElementById('task-title').value =  tasks[i].name; 
            document.getElementById('task-description').value =  tasks[i].description; 
            document.getElementById('task-importance').value =  tasks[i].importance; 
            document.getElementById('task-date').value =  tasks[i].date; 
        }
    }
    deleteTask(id);

}

ReloadPageInfo();