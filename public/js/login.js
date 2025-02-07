let isLogin = true;
        document.getElementById('toggleButton').addEventListener('click', function() {
            const formTitle = document.getElementById('formTitle');
            const nameField = document.getElementById('nameField');
            const submitButton = document.querySelector('button[type="submit"]');
            
            if (isLogin) {
                formTitle.textContent = "Registro";
                nameField.classList.remove('hidden');
                telefone.classList.remove('hidden');
                submitButton.textContent = "Registrar";
                this.textContent = "Já tem uma conta? Faça login";
            } else {
                formTitle.textContent = "Login";
                nameField.classList.add('hidden');
                telefone.classList.add('hidden');
                submitButton.textContent = "Entrar";
                this.textContent = "Criar uma conta";
            }
            isLogin = !isLogin;
        });