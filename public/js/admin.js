function buscarUsuariosPendentes() {
    fetch('public/config/crud.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'buscarPendentes' })
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#lista_pendentes');
        tableBody.innerHTML = '';

        data.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.status}</td>
                <td>
                    <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="atualizarStatus(${usuario.id}, 'ativo')">Aprovar</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="atualizarStatus(${usuario.id}, 'inativo')">Rejeitar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar usuários pendentes:', error)});
        
}

function atualizarStatus(id, status) {
    fetch('public/config/crud.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'atualizarStatus', id: id, status: status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Usuário ${status === 'ativo' ? 'aprovado' : 'rejeitado'} com sucesso!`);
            buscarUsuariosPendentes();
        } else {
            alert('Erro ao atualizar status do usuário.');
        }
    });
}

window.onload = buscarUsuariosPendentes;
