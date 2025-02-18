function buscarUsuariosPendentes() {
    fetch('public/config/crud.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'buscarPendentes' })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.success) {
            throw new Error(data.error || "Erro desconhecido.");
        }

        const tableBody = document.querySelector('#lista_pendentes');
        tableBody.innerHTML = '';

        data.dados.forEach(usuario => {
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
    .catch(error => console.error('Erro ao buscar usuários pendentes:', error));
}
