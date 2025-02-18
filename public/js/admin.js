async function buscarUsuariosPendentes() {
    try {
        const response = await fetch('public/config/crud.php', {
            method: "POST", // Se você estiver buscando dados, use GET. Se estiver enviando, mantenha POST.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Passe os dados necessários, se houver
                status: 'pendente' // Por exemplo, se você quer filtrar por status
            }) 
        });

        const data = await response.json();

        if (data.success) {
            const tbody = document.getElementById('usuariosTable').getElementsByTagName('tbody')[0];
            data.dados.forEach(usuario => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = usuario.nome;
                row.insertCell(1).textContent = usuario.email;
                row.insertCell(2).textContent = usuario.telefone;
                row.insertCell(3).textContent = usuario.status;
            });
        } else {
            console.error('Erro ao buscar dados:', data.dados);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}

// Chama a função para buscar usuários quando a página carrega
window.onload = buscarUsuariosPendentes;