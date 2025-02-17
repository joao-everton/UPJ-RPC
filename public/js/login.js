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
    const telefone = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value;

    if (!email.includes('@')) {
        alert("Por favor, insira um email válido com '@'.");
        return;
    }

    // Log para verificar se as variáveis estão corretas
    console.log('Nome:', nome, 'Email:', email, 'Telefone:', telefone, 'Senha:', senha);

        fetch('public/config/crud.php', {
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
            console.log(data);
            if (data.success) {
                function OpenModal() {
                    const modal = document.getElementById('modal_cadastro_enviado');
                    const body = document.getElementById('body');
                    if (modal) {
                        modal.classList.remove('hidden'); // Exibe o modal
                        body.classList.add('backdrop-opacity-60');
                    }
                }
    
                // Função para fechar o modal
                function CloseModal() {
                    const body = document.getElementById('body');
                    const modal = document.getElementById('modal_cadastro_enviado');
                    if (modal) {
                        modal.classList.add('hidden'); // Esconde o modal
                        body.classList.remove('backdrop-opacity-60');
                    }
                }
    
                // Adiciona evento de clique ao botão de fechar
                document.getElementById('fechar-modal').addEventListener('click', CloseModal);
    
                OpenModal(); // Chama a função para abrir o modal
                document.getElementById('Form').reset();
                
            } else {
                alert('Usuario já cadastrado');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });