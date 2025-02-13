<?php
    $db_server = "localhost:3306";
    $db_user = "root";
    $db_pass = "";
    $db_name = "upj_db";

    // Conectar ao banco de dados
    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

    // Verificar se a conexão foi bem-sucedida
    if (!$conn) {
        die("Erro na conexão: " . mysqli_connect_error());
    }

    echo "Conectado com sucesso!!!";
?>
