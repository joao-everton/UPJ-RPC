<?php
    $db_server = "localhost";
    $db_user = "user";
    $db_pass = "bruno070601";
    $db_name = "upj_db";
    $conn = "";
    
    try {
        $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    }
    catch(mysqli_sql_exception){
        echo "Não foi possível conectar ao banco";
    }
?>