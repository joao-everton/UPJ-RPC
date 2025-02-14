<?php
include "config.php";

// Função de cadastro

function cadastro($nome, $email, $telefone, $senha, $conn) {
    $senhaHash = password_hash($senha, PASSWORD_BCRYPT);
    $sql = "INSERT INTO usuarios (nome, email, telefone, senha) VALUES ($nome, $email, $telefone, $senhaHash)";
    if ($conn->query($sql) === TRUE) {
        return json_encode(["success" => true]);
    } else {
        return json_encode(["success" => false, "error" => $conn->error]); // Adicione isso
    }
}
// Função para buscar usuários pendentes
function buscarUsuariosPendentes($conn) {
    $sql = "SELECT id, nome, email, telefone FROM usuarios WHERE status = 'pendente'";
    $result = $conn->query($sql);
    $usuarios = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
    }
    return json_encode($usuarios);
}

// Função para atualizar o status do usuário
function atualizarStatusUsuario($id, $status, $conn) {
    $sql = "UPDATE usuarios SET status = '$status' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        return json_encode(["success" => true]);
    } else {
        return json_encode(["success" => false]);
    }
}

// Verificar o tipo de requisição
$request = json_decode(file_get_contents('php://input'), true);

// Chamar funções de acordo com a ação
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $request = json_decode(file_get_contents('php://input'), true);
    if (isset($request['action'])) {
        switch ($request['action']) {
            case 'cadastrar':
                echo cadastro($request['nome'], $request['email'], $request['telefone'], $request['senha'], $conn);
                break;
            // outros casos...
        }
    }
}

?>