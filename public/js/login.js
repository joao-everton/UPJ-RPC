let isLogin = true;

document.getElementById('toggleButton').addEventListener('click', function() {
    const formTitle = document.getElementById('formTitle');
    const nameField = document.getElementById('nameField');
    const email = document.getElementById('email');
    const submitButton = document.getElementById('submitbtn');
    const telefone = document.getElementById('telefone');
    
    if (isLogin) {
        formTitle.textContent = "Registro";
        email.placeholder = "Email";
        nameField.classList.remove('hidden');
        telefone.classList.remove('hidden');
        submitButton.textContent = "Registrar";
        this.textContent = "Já tem uma conta? Faça login";
        console.log('Mudou para Registro');
    } else {
        formTitle.textContent = "Login";
        nameField.classList.add('hidden');
        email.placeholder = "Email";
        telefone.classList.add('hidden');
        submitButton.textContent = "Entrar";
        this.textContent = "Criar uma conta";
        console.log('Mudou para Login');
    }

    isLogin = !isLogin;
});

// Adiciona o ouvinte de eventos para o botão de submit
document.getElementById('submitbtn').addEventListener('click', function(e) {
    e.preventDefault();  // Evita o envio normal do formulário

    const nome = document.getElementById('nameField').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;

    // Log para verificar se as variáveis estão corretas
    console.log('Nome:', nome, 'Email:', email, 'Telefone:', telefone, 'Senha:', senha);

    fetch('crud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: isLogin ? 'login' : 'cadastrar',  // Ajuste baseado no estado
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Requisição de cadastro enviada');
            document.getElementById('Form').reset();
        } else {
            alert('Erro ao cadastrar.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});