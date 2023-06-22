const token = localStorage.getItem("jwt");

const requestHeadersAuth = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": token,
};

function logOut() {
    localStorage.clear();
    window.location.href = "index.html";
}

function getTasks() {
    const requestReq = {
        method: "GET",
        headers: requestHeadersAuth,
    };

    fetch(`${baseUrlApi()}/users/login`, requestReq).then((response) => {
        console.log(response);
        if (response.ok) {
        } else {
        }
    });
}

// let loginUsuario = {
//     email: "dvas1g@ig.com.br",
//     password: "12345678",
// };

// localStorage.clear(token);
function checkAuth() {
    if (token === null) {
        logOut();
    } else {
        getTasks();
    }
}
