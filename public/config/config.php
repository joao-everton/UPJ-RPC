<?php
$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "upj_db";

try {
    // Tenta conectar ao banco de dados
    $conn = new mysqli($db_server, $db_user, $db_pass, $db_name);

    // Se houver erro, o próprio MySQLi lançará uma exceção no PHP 8+
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    echo "Conectado com sucesso";
} catch (Throwable $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>
