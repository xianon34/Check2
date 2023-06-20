// Definição da URL base da API
const apiBaseUrl = 'https://todo-api.ctd.academy/v1';

// Referências aos elementos HTML
const inputNome = document.getElementById('inputNome');
const inputSobrenome = document.getElementById('inputSobrenome');
const inputEmail = document.getElementById('inputEmail');
const inputSenha = document.getElementById('inputSenha');
const inputRepetirSenha = document.getElementById('inputRepetirSenha');
const submitButton = document.getElementById('submitButton');

// Objeto que armazena os erros de validação dos campos do formulário
const formErrors = {
  nome: true,
  sobrenome: true,
  email: true,
  senha: true,
  repetirSenha: true
};

// Objeto que será preenchido com as informações fornecidas pelo usuário
const user = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repetirSenha: ''
};

// Função para desabilitar o botão de envio do formulário se houver erros nos campos
const disableButtonIfFormHasErrors = () => {
  const hasErrors = Object.values(formErrors).some((error) => error);
  submitButton.disabled = hasErrors;
};

// Função para exibir uma mensagem de erro em um elemento específico
const displayError = (elementId, message) => {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = message;
  errorElement.style.color = 'red';
};

// Função para remover uma mensagem de erro de um elemento específico
const removeError = (elementId) => {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = '';
};

// Funções de validação para cada campo do formulário

// Validação do campo "Nome"
const validateNome = (nome) => {
  if (nome === '') {
    displayError('nomeError', 'O campo de nome é obrigatório');
    formErrors.nome = true;
  } else if (nome.length < 6 || nome.length > 12) {
    displayError('nomeError', 'O nome deve ter entre 6 e 12 caracteres');
    formErrors.nome = true;
  } else {
    removeError('nomeError');
    formErrors.nome = false;
  }
};

// Validação do campo "Sobrenome"
const validateSobrenome = (sobrenome) => {
  if (sobrenome === '') {
    displayError('sobrenomeError', 'O campo de sobrenome é obrigatório');
    formErrors.sobrenome = true;
  } else if (sobrenome.length < 6 || sobrenome.length > 12) {
    displayError('sobrenomeError', 'O sobrenome deve ter entre 6 e 12 caracteres');
    formErrors.sobrenome = true;
  } else {
    removeError('sobrenomeError');
    formErrors.sobrenome = false;
  }
};

// Validação do campo "Email"
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '' || !emailRegex.test(email)) {
    displayError('emailError', 'Por favor, insira um email válido');
    formErrors.email = true;
  } else {
    removeError('emailError');
    formErrors.email = false;
  }
};

// Validação do campo "Senha"
const validateSenha = (senha) => {
  if (senha === '' || senha.length < 8) {
    displayError('senhaError', 'A senha deve ter pelo menos 8 caracteres');
    formErrors.senha = true;
  } else {
    removeError('senhaError');
    formErrors.senha = false;
  }
};

// Validação do campo "Repetir Senha"
const validateRepetirSenha = (repetirSenha) => {
  const senha = inputSenha.value;
  if (repetirSenha === '' || repetirSenha !== senha) {
    displayError('repetirSenhaError', 'As senhas devem ser iguais');
    formErrors.repetirSenha = true;
  } else {
    removeError('repetirSenhaError');
    formErrors.repetirSenha = false;
  }
};

// Função para exibir uma mensagem de sucesso
const displaySuccessMessage = () => {
  const successMessage = document.getElementById('successMessage');
  successMessage.innerText = 'Usuário cadastrado com sucesso , redirecionan para login';
  successMessage.style.color = 'green';
};

// Função para redirecionar para a página de login após 4 segundos
const redirectToLogin = () => {
  window.location.href = './index.html';
};

// Manipulador de eventos para alterações nos campos do formulário
const handleInputChange = (event) => {
  const { id, value } = event.target;
  user[id] = value;

  // Chama a função de validação correspondente com base no ID do campo
  switch (id) {
    case 'inputNome':
      validateNome(value);
      break;
    case 'inputSobrenome':
      validateSobrenome(value);
      break;
    case 'inputEmail':
      validateEmail(value);
      break;
    case 'inputSenha':
      validateSenha(value);
      break;
    case 'inputRepetirSenha':
      validateRepetirSenha(value);
      break;
    default:
      break;
  }

  // Desabilita o botão de envio se houver erros nos campos
  disableButtonIfFormHasErrors();
};

// Manipulador de eventos para o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();

  // Verifica se existem erros de validação nos campos do formulário
  if (Object.values(formErrors).some((error) => error)) {
    // Valida novamente cada campo individualmente para exibir as mensagens de erro correspondentes
    validateNome(inputNome.value);
    validateSobrenome(inputSobrenome.value);
    validateEmail(inputEmail.value);
    validateSenha(inputSenha.value);
    validateRepetirSenha(inputRepetirSenha.value);
  } else {
    // Preenche o objeto "user" com os valores dos campos
    user.firstName = inputNome.value;
    user.lastName = inputSobrenome.value;
    user.email = inputEmail.value;
    user.password = inputSenha.value;

    // Configurações para a requisição POST
    const requestHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    const requestSettings = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: requestHeaders
    };

    // Envio da requisição POST para a API
    fetch(`${apiBaseUrl}/users`, requestSettings)
      .then(response => {
        if (response.ok) {
          displaySuccessMessage(); // Exibe a mensagem de sucesso
          setTimeout(redirectToLogin, 4000); // Redireciona para a página de login após 4 segundos
        } else if (response.status === 400) {
          // Exibe mensagens de erro retornadas pela API
          response.json().then(data => {
            displayError('emailError', data.message || 'O email já foi cadastrado, use outro');
          });
        } else {
          console.error('Erro ao cadastrar o usuário:', response.status);
        }
      })
      .catch(error => {
        console.error('Erro ao cadastrar o usuário:', error);
      });
  }
};

// Adiciona os manipuladores de eventos aos elementos HTML
inputNome.addEventListener('input', handleInputChange);
inputSobrenome.addEventListener('input', handleInputChange);
inputEmail.addEventListener('input', handleInputChange);
inputSenha.addEventListener('input', handleInputChange);
inputRepetirSenha.addEventListener('input', handleInputChange);

submitButton.addEventListener('click', handleSubmit);
