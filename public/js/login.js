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
        function cadastrar() {
            const nome = document.getElementById('nameField').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const telefone = document.getElementById('telefone').value;
            const praça = "Curitiba";  // Exemplo fixo, você pode modificar conforme necessário
    
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "public/config/crud.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                alert(xhr.responseText);  // Resposta do servidor
            };
            xhr.send(`action=register&nome=${nome}&email=${email}&senha=${senha}&telefone=${telefone}&praça=${praça}`);
        }
    }
    
    

