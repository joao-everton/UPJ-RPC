<?php
include "public/config/config.php";

$action = $_POST['action'] ?? '';

if ($action == "register") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO usuarios (funcao, nome, email, telefone, senha, praça, status) 
            VALUES (DEFAULT, ?, ?, ?, ?, 'Curitiba', DEFAULT)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nome, $email, $telefone, $senha);
    
    if ($stmt->execute()) {
        echo "Usuário registrado com sucesso!";
    } else {
        echo "Erro ao registrar usuário: " . $conn->error;
    }
}

if ($action == "login") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "SELECT id_usuario, senha, status FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($senha, $row['senha'])) {
            if ($row['status'] == 'pendente') {
                echo "Aguardando aprovação.";
            } else {
                echo "success";
            }
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }
}

if ($action == "getPendingUsers") {
    $sql = "SELECT id_usuario, nome, email FROM usuarios WHERE status = 'pendente'";
    $result = $conn->query($sql);
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
}

if ($action == "approveUser") {
    $id = $_POST['id'];

    $sql = "UPDATE usuarios SET status = 'ativo' WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Usuário aprovado!";
    } else {
        echo "Erro ao aprovar usuário.";
    }
}

if ($action == "rejectUser") {
    $id = $_POST['id'];

    $sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Usuário rejeitado!";
    } else {
        echo "Erro ao rejeitar usuário.";
    }
}

$conn->close();
?>
