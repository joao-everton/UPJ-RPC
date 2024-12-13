function toggleTable(period) {
    const tableManha = document.getElementById('table_manha_container');
    const tableTarde = document.getElementById('table_tarde_container');
    const btnManha = document.querySelector('#head_manha .toggle-btn');
    const btnTarde = document.querySelector('#head_tarde .toggle-btn');

    if (period === 'manha') {
        tableManha.classList.toggle('open');
        btnManha.classList.toggle('rotate');
    } else {
        tableTarde.classList.toggle('open');
        btnTarde.classList.toggle('rotate');
    }
}
// Adiciona 4 linhas em cada tabela ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    toggleTable('manha');  // Inicia com a tabela da manhã aberta
});

// Função para adicionar uma nova linha na tabela
function addNewRow(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;

    if (rowCount >= 15) {
        alert("Máximo de 15 linhas atingido");
        return;
    }

    const newRow = table.insertRow();

    // Criação das células
    const cellUPJ = newRow.insertCell(0);
    const cellHorario = newRow.insertCell(1);
    const cellReporter = newRow.insertCell(2);
    const cellRepCinemat = newRow.insertCell(3);
    const cellAuxiliar = newRow.insertCell(4);
    const cellCarro = newRow.insertCell(5);
    const cellMochilink = newRow.insertCell(6);
    const cellAcessorios = newRow.insertCell(7);
    const cellDelete = newRow.insertCell(8);

    // Conteúdo das células
    cellUPJ.innerHTML = `<input type="text" class="UPJ" style="width: 70px;">
                         <select id="UPJ-options"></select>`;

    cellHorario.innerHTML = `<div class="time-inputs">
                                <input type="time" class="hora-entrada" placeholder="HH:MM">
                                <input type="time" class="hora-saida" placeholder="HH:MM">
                             </div>`;

    cellReporter.innerHTML = `<input type="text" placeholder="Nome do Repórter">`;
    cellRepCinemat.innerHTML = `<input type="text" placeholder="Nome do Cinematografista">`;
    cellAuxiliar.innerHTML = `<input type="text" placeholder="Nome do Auxiliar">`;
    cellCarro.innerHTML = `<input type="text" placeholder="Carro">`;
    cellMochilink.innerHTML = `<input type="text" placeholder="Mochilink">`;
    cellAcessorios.innerHTML = `<input type="text" placeholder="Acessórios / Eventos">`;

    // Botão de deletar na última célula
    cellDelete.innerHTML = `<button class="delete-btn">Deletar</button>`;
    cellDelete.querySelector(".delete-btn").addEventListener("click", function () {
        if (table.rows.length > 1) {
            table.deleteRow(newRow.rowIndex - 1);
        } else {
            alert("A tabela deve ter pelo menos uma linha.");
        }
    });
}

// Adiciona 4 linhas em cada tabela ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    toggleTable('manha');  // Inicia com a tabela da manhã aberta
    for (let i = 0; i < 4; i++) {
        addNewRow("table_manha");
        addNewRow("table_tarde");
    }
});

// Eventos para adicionar novas linhas
document.getElementById("add_line_manha").addEventListener("click", function () {
    addNewRow("table_manha");
});

document.getElementById("add_line_tarde").addEventListener("click", function () {
    addNewRow("table_tarde");
});
