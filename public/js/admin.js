async function buscarUsuariosPendentes() {
    try {
        const response = await fetch('public/config/crud.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'buscarPendentes' })
        });

        const data = await response.json();

        if (data.success) {
            const tbody = document.getElementById('lista_pendentes');
            tbody.innerHTML = '';

            data.dados.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefone}</td>
                    <td>
                        <button id="aprovar-${usuario.id_usuario}" class="bg-green-500 text-white px-2 py-1 rounded">Aprovar</button>
                        <button id="rejeitar-${usuario.id_usuario}" class="bg-red-500 text-white px-2 py-1 rounded">Rejeitar</button>
                    </td>
                `;
                tbody.appendChild(row);

                // Adiciona eventos para os botões
                document.getElementById(`aprovar-${usuario.id_usuario}`).addEventListener('click', () => aprovarUsuario(usuario.id_usuario));
                document.getElementById(`rejeitar-${usuario.id_usuario}`).addEventListener('click', () => rejeitarUsuario(usuario.id_usuario));
            });
        } else {
            console.error('Erro ao buscar usuários pendentes:', data.error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Função para aprovar usuário
async function aprovarUsuario(id_usuario) {
    await atualizarStatus(id_usuario, 'ativo');
}

// Função para rejeitar usuário
async function rejeitarUsuario(id_usuario) {
    await atualizarStatus(id_usuario, 'inativo');
}

// Função genérica para atualizar status
async function atualizarStatus(id_usuario, status) {
    try {
        const response = await fetch('public/config/crud.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'atualizarStatus',
                id_usuario: id_usuario,
                status: status
            })
        });

        const data = await response.json();

        if (data.success) {
            alert(`Usuário atualizado para ${status}!`);
            buscarUsuariosPendentes(); // Atualiza a tabela após a alteração
        } else {
            alert(`Erro ao atualizar usuário: ${data.error}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição. Verifique o console.');
    }
}

// Chama a função para buscar usuários ao carregar a página
window.onload = buscarUsuariosPendentes;
