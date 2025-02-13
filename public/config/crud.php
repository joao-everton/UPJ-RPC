<?php
    include "public/config/config.php";

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    

    $sql = "INSERT INTO usuarios (nome, email, telefone, senha) VALUES (DEFAULT, DEFAULT, '$nome', '$email', '$telefone', '$senha', DEFAULT)";

    if ($conn->query($sql) === TRUE) {
        echo "Requisição de cadastro realizada com sucesso!";
    } else {
        echo "Erro: " . $conn->error;
    }
    
    $conn->close();

    
        

?>