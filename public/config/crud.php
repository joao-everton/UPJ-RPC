<?php
include "public/config/config.php";

// Aprovação de usuário
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

// Rejeição de usuário
if ($action == "rejectUser") {
    $id = $_POST['id'];

    // Aqui pode ser uma atualização do status para "rejeitado" ao invés de deletar
    $sql = "UPDATE usuarios SET status = 'rejeitado' WHERE id_usuario = ?";
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
