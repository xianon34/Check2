const apiBaseUrl = 'https://todo-api.ctd.academy/v1';

// Capturando os elementos do formulário
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const submitButton = document.getElementById('submitButton');

// Função para enviar a requisição à API para autenticação do usuário
const login = () => {
  const email = inputEmail.value;
  const senha = inputPassword.value;

  // Lógica para enviar a requisição à API usando o método fetch
  fetch(`${apiBaseUrl}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password: senha }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        // Redirecionar para a página de tarefas
        window.location.href = './tarefas.html';
      } else {
        // Exibir mensagem de erro
        displayError('loginError', 'Email ou senha inválidos');
      }
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
    });
};

// Manipulador de eventos para o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();

  // Lógica para enviar o formulário ao servidor
  login();
};

// Adicionando o manipulador de eventos ao botão de envio
submitButton.addEventListener('click', handleSubmit);
