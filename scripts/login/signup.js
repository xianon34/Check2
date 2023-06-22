const formToDoRef = document.querySelector("#formToDo");
const emailInputRef = document.querySelector("#emailInput");
const passwordInputRef = document.querySelector("#passwordInput");
const confirmInputRef = document.querySelector("#confirmInput");
const btnSubmitRef = document.querySelector("#btnSubmit");

var user = { 
  firstName: "Davi",
  lastName: "Alves",
  email: "dvas1g@ig.com.br",
  password: "12345678"
}



function createUser(event) {

    event.preventDefault()

    const requestHeaders = {
        "Accept": "application/json",  
        "Content-Type": "application/json"
    }

    const requestReq = {
        method: "POST",
        body: JSON.stringify(user),
        headers: requestHeaders
    }
    
    fetch(`${baseUrlApi()}/users`, requestReq ).then(
        response => {
            console.log(response)
            if(response.ok) {
                console.log('Usuário cadastrado con sucesso.')
            } else {
                alert('Esse email já foi cadastrado.')
            }
        }
    )
}


btnSubmitRef.addEventListener("click", event => createUser(event))

emailInputRef.addEventListener('keyup', event => {

    console.log(event.target.checkValidity())
})

