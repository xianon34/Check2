const inputEmailRef = document.querySelector("#inputEmail");
const inputPasswordRef = document.querySelector("#inputPassword");
const btnSubmitRef = document.querySelector("#btnSubmit");

let loginUsuario = {
    email: "dvas1g@ig.com.br",
    password: "12345678",
};

// const requestHeaders = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
// };

function authUser(event) {
    event.preventDefault();

    const requestHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    

    const requestReq = {
        method: "POST",
        body: JSON.stringify(loginUsuario),
        headers: requestHeaders,
    };

    fetch(`${baseUrlApi()}/users/login`, requestReq).then((response) => {
        console.log(response);
        if (response.ok) {
            response.json().then(
                token => {
                   localStorage.setItem('jwt', token.jwt)
                    window.location.href = 'tarefas.html'
                }
            )
        } else {
        }
    });
}

btnSubmitRef.addEventListener("click", event => authUser(event));

// emailInputRef.addEventListener("keyup", (event) => {
//     console.log(event.target.checkValidity());
// });
