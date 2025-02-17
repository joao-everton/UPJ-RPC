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
    } else {
        formTitle.textContent = "Login";
        nameField.classList.add('hidden');
        email.placeholder = "Email";
        telefone.classList.add('hidden');
        submitButton.textContent = "Entrar";
        this.textContent = "Criar uma conta";
    }

    isLogin = !isLogin;
});

// Funções para abrir e fechar o modal
function abrirModal() {
    const modal = document.getElementById("modal_cadastro_enviado");
    const backdrop = document.getElementById("backdrop");

    modal.classList.remove("scale-0");
    modal.classList.remove("hidden");
    modal.classList.add("scale-100");
    backdrop.classList.remove("hidden");
    backdrop.classList.add("opacity-100");

}

function fecharModal() {
    const modal = document.getElementById("modal_cadastro_enviado");
    const backdrop = document.getElementById("backdrop");

    modal.classList.remove("scale-100");
    modal.classList.add("scale-0");
    backdrop.classList.remove("opacity-100");

    setTimeout(() => {
        backdrop.classList.add("hidden");
    }, 300); // Aguarda a animação antes de esconder
}

// Adiciona evento para fechar o modal
document.getElementById("fechar-modal").addEventListener("click", fecharModal);

// Ouvinte de evento para envio do formulário
document.getElementById('submitbtn').addEventListener('click', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nameField').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email.includes('@')) {
        alert("Por favor, insira um email válido com '@'.");
        return;
    }

    fetch('public/config/crud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: isLogin ? 'login' : 'cadastrar',
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            abrirModal(); // Mostra o modal de sucesso
            document.getElementById('Form').reset();
        } else {
            alert('Usuário já cadastrado ou erro no login.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro na requisição. Verifique o console.');
    });
});
