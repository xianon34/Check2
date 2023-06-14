// Capturando os elementos do formulário
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const submitButton = document.getElementById('submitButton');

// Definindo os erros do formulário
const formErrors = {
  email: true,
  senha: true
};

// Desabilitando o botão de envio se houver erros no formulário
const disableButtonIfFormHasErrors = () => {
  const hasErrors = Object.values(formErrors).some((error) => error);
  submitButton.disabled = hasErrors;
};

// Exibindo mensagem de erro
const displayError = (elementId, message) => {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = message;
  errorElement.style.color = 'red';
};

// Removendo mensagem de erro
const removeError = (elementId) => {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = '';
};

// Validação do campo de email
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

// Validação do campo de senha
const validateSenha = (senha) => {
  if (senha === '') {
    displayError('senhaError', 'O campo de senha é obrigatório');
    formErrors.senha = true;
  } else if (senha.length < 4) {
    displayError('senhaError', 'A senha deve ter no mínimo 4 caracteres');
    formErrors.senha = true;
  } else {
    removeError('senhaError');
    formErrors.senha = false;
  }
};

// Manipulador de eventos para o campo de email
const handleEmailInputChange = () => {
  const email = inputEmail.value;
  validateEmail(email);
  disableButtonIfFormHasErrors();
};

// Manipulador de eventos para o campo de senha
const handlePasswordInputChange = () => {
  const senha = inputPassword.value;
  validateSenha(senha);
  disableButtonIfFormHasErrors();
};

// Manipulador de eventos para o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();

  // Validação dos campos antes do envio do formulário
  const email = inputEmail.value;
  const senha = inputPassword.value;
  validateEmail(email);
  validateSenha(senha);

  if (!formErrors.email && !formErrors.senha) {
    // Lógica para enviar o formulário ao servidor
    console.log('Formulário enviado com sucesso!');
  }
};

// Adicionando os manipuladores de eventos aos elementos do formulário
inputEmail.addEventListener('input', handleEmailInputChange);
inputPassword.addEventListener('input', handlePasswordInputChange);
submitButton.addEventListener('click', handleSubmit);
