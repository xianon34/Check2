function validateForm() {
    var emailInput = document.getElementById('inputEmail');
    var senhaInput = document.getElementById('inputPassword');
    var emailError = document.getElementById('emailError');
    var senhaError = document.getElementById('senhaError');
  
    // Limpa as mensagens de erro
    emailError.innerText = '';
    senhaError.innerText = '';
  
    // Verifica se o email está vazio
    if (emailInput.value === '') {
      emailError.innerText = 'Por favor, insira um email válido';
      return false; // Impede o envio do formulário
    }
  
    // Verifica se a senha está vazia
    if (senhaInput.value === '') {
      senhaError.innerText = 'Por favor, insira uma senha válida';
      return false; // Impede o envio do formulário
    }
  
    return true; // Permite o envio do formulário
  }
  
  // Adiciona event listeners para verificar a validação ao interagir com os campos
  document.getElementById('inputEmail').addEventListener('input', validateForm);
  document.getElementById('inputPassword').addEventListener('input', validateForm);
  