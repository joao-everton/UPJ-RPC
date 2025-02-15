<?php
include "config.php";

// Função de cadastro
function cadastro($nome, $email, $telefone, $senha, $conn) {
    try {
        $senhaHash = password_hash($senha, PASSWORD_BCRYPT);

        // Verificar se o e-mail já existe
        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result(); // Necessário para usar num_rows

        if ($stmt->num_rows > 0) {
            $stmt->close(); // Fecha antes de continuar
            return json_encode(["success" => false, "error" => "E-mail já cadastrado"]);
        }
        $stmt->close();

        // Converter telefone para inteiro (se for INT no banco)
        $telefoneInt = (int) preg_replace('/\D/', '', $telefone); // Remove caracteres não numéricos

        // Inserir novo usuário
        $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $nome, $email, $telefoneInt, $senhaHash);
        $stmt->execute();
        $stmt->close();

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
    $stmt = $conn->prepare("UPDATE usuarios SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $id);

    if ($stmt->execute()) {
        return json_encode(["success" => true]);
    } else {
        return json_encode(["success" => false, "error" => "Erro ao atualizar status"]);
    }
}

// Capturar JSON apenas uma vez
$request = json_decode(file_get_contents('php://input'), true);

// Verificar o tipo de requisição
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json'); // Define resposta como JSON

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
