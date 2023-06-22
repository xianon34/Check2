import {baseUrlApi} from "./../validacoes/utils.js"

const token = localStorage.getItem("jwt");
const submitBtnRef = document.querySelector("#submitBtn");
const openTasksListRef = document.querySelector("#openTasksList");

const requestHeadersAuth = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": token,
};

function logOut() {
    localStorage.clear();
    window.location.href = "index.html";
}


function inserirTarefas(tasks) {

    openTasksListRef.innerHTML = ''

    for(let task of tasks) {

        openTasksListRef.innerHTML += `
        
        <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
                <p class="nome">${task.description}</p>
                <p class="timestamp">Criada em: ${task.createdAt}</p>
            </div>
      </li>
        
        `

    }

}

function getTasks() {
    const requestReq = {
        method: "GET",
        headers: requestHeadersAuth,
    };

    fetch(`${baseUrlApi}/tasks`, requestReq).then((response) => {
        console.log(response);
        if (response.ok) {
            response.json().then(
                tasks => {
                  setTimeout(() => inserirTarefas(tasks), 1000)
                }
            )
        } else {
            if(response.status === 401) {
                logOut()
            }
            
        }
    });
}

function createTask(event) {
    event.preventDefaut()

    const tasks = {
        description: 'Finalizar app',
        completed: true
    }

    const requestReq = {
        method: "POST",
        bady: JSON.stringify(tasks),
        headers: requestHeadersAuth,
    };

    fetch(`${baseUrlApi}/tasks`, requestReq).then(
        response => {
            if(response.ok) {
                getTasks()
            }
        }
    )
}

function checkAuth() {
    if (token === null) {
        logOut();
    } else {
        getTasks();
    }
}

checkAuth()

submitBtnRef.addEventListener('click', event => createTask(event));