async function buscarUsuariosPendentes() {
    console.log("🔄 Buscando usuários pendentes...");

    try {
        const response = await fetch('public/config/crud.php', { 
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'buscarPendentes' }) 
        });

        const data = await response.json();
        console.log("📡 Resposta da API:", data); // Depuração no console

        if (!data.success) {
            throw new Error(data.error || "Erro desconhecido.");
        }

        const tbody = document.getElementById('lista_pendentes');
        tbody.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

        data.dados.forEach(usuario => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="px-4 py-2">${usuario.nome}</td>
                <td class="px-4 py-2">${usuario.email}</td>
                <td class="px-4 py-2">${usuario.telefone}</td>
                <td class="px-4 py-2">
                    <button class="bg-green-500 text-white px-2 py-1 rounded" 
                        onclick="atualizarStatus(${usuario.id}, 'ativo')">
                        Aprovar
                    </button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" 
                        onclick="atualizarStatus(${usuario.id}, 'inativo')">
                        Rejeitar
                    </button>
                </td>
            `;
            tbody.appendChild(row);
            row.querySelector(".atualizarStatus").addEventListener("click", function () {
                fetch("public/config/crud.php", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'atualizarStatus' })
                })
            })
        });
    } catch (error) {
        console.error('❌ Erro ao buscar usuários pendentes:', error);
    }
}

// Chama a função ao carregar a página
window.onload = buscarUsuariosPendentes;


