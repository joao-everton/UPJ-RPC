function buscarUsuariosPendentes() {
    fetch('public/config/crud.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usuariosTable tbody');
            tableBody.innerHTML = '';

            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefone}</td>
                    <td>
                        <button onclick="aprovarUsuario(${usuario.id})">Aprovar</button>
                        <button onclick="rejeitarUsuario(${usuario.id})">Rejeitar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários pendentes:', error));
}

function aprovarUsuario(id) {
    fetch('public/config/crud.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'aprovar', id: id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuário aprovado!');
            buscarUsuariosPendentes();
        } else {
            alert('Erro ao aprovar usuário.');
        }
    });
}

function rejeitarUsuario(id) {
    fetch('crud.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'rejeitar', id: id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuário rejeitado!');
            buscarUsuariosPendentes();
        } else {
            alert('Erro ao rejeitar usuário.');
        }
    });
}

window.onload = buscarUsuariosPendentes;