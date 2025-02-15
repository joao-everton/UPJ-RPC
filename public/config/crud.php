<?php
include "config.php";

// Função de cadastro


function cadastro($nome, $email, $telefone, $senha, $conn) {
    try {
        $senhaHash = password_hash($senha, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        if ($stmt->num_rows > 0)
        $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $nome, $email, $telefone, $senhaHash);
        $stmt->execute();
        return json_encode(["success" => true]);
    } catch (Throwable $e) {
        return json_encode(["success" => false, "error" => $e->getMessage()]);
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
    header('Content-Type: application/json'); // Garante que o retorno seja JSON
    $request = json_decode(file_get_contents('php://input'), true);

    if (isset($request['action'])) {
        switch ($request['action']) {
            case 'cadastrar':
                echo cadastro($request['nome'], $request['email'], $request['telefone'], $request['senha'], $conn);
                break;

            case 'buscarPendentes':
                echo buscarUsuariosPendentes($conn);
                break;

            case 'atualizarStatus':
                echo atualizarStatusUsuario($request['id'], $request['status'], $conn);
                break;

            default:
                echo json_encode(["success" => false, "error" => "Ação inválida"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Nenhuma ação especificada"]);
    }
}



?>