 // Capturando o elemento do botão "Finalizar Sessão"
 const logoutButton = document.getElementById('closeApp');

 // Função para realizar o logout e redirecionar para a página "index.html"
 const logout = () => {
   // Lógica para realizar o logout (limpar os dados de autenticação, por exemplo)
   // ...

   // Redirecionar para a página "index.html"
   window.location.href = 'index.html';
 };

 // Adicionando o manipulador de eventos ao botão "Finalizar Sessão"
 logoutButton.addEventListener('click', logout);