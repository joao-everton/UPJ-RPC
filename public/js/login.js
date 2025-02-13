let isLogin = true;
    document.getElementById('toggleButton').addEventListener('click', function() {
        const formTitle = document.getElementById('formTitle');
        const nameField = document.getElementById('nameField');
        const email = document.getElementById('email');
        const submitButton = document.querySelector('button[type="submit"]');
        
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
            email.placeholder = "Email / Nome";
            telefone.classList.add('hidden');
            submitButton.textContent = "Entrar";
            this.textContent = "Criar uma conta";
        }
        isLogin = !isLogin;
    });

    if (!isLogin) { 
        // Função para enviar os dados via AJAX
        document.getElementById('Form').addEventListener('submit', function(e) {
        e.preventDefault();  // Evitar o envio normal do formulário

        const nome = document.getElementById('nameField').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;

        fetch('public/config/crud.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
                // Limpar campos
                document.getElementById('Form').reset();
            } else {
                alert('Erro ao cadastrar.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
    }
    
    

