let isLogin = true;
    document.getElementById('toggleButton').addEventListener('click', function() {
        const formTitle = document.getElementById('formTitle');
        const nameField = document.getElementById('nameField');
        const email = document.getElementById('email');
        const submitButton = document.querySelector('button[type="submit"]');
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
            email.placeholder = "Email / Nome";
            telefone.classList.add('hidden');
            submitButton.textContent = "Entrar";
            this.textContent = "Criar uma conta";
        }
        isLogin = !isLogin;
    });

    if (!isLogin) { 
        if (!isLogin) { 
            document.getElementById('form').addEventListener('submit', function(e) {
                e.preventDefault();  // Evitar o envio normal do formulário
        
                const nome = document.getElementById('nameField').value;
                const email = document.getElementById('email').value;
                const telefone = document.getElementById('telefone').value;
                const senha = document.getElementById('senha').value;
        
                fetch('crud.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        $action: 'cadastrar', // Adicione a ação de cadastro
                        $nome: nome,
                        $email: email,
                        $telefone: telefone,
                        $senha: senha,
                        
                    })
                })
                console.log($action, $nome, $email, $telefone, $senha)

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
        }
    }
    
    

