$(document).ready(function () {
    let isLogin = true;

    $("#toggleButton").click(function () {
        $("#formTitle").text(isLogin ? "Registro" : "Login");
        $("#nameField, #telefone").toggleClass("hidden");
        $("button[type='submit']").text(isLogin ? "Registrar" : "Entrar");
        $(this).text(isLogin ? "Já tem uma conta? Faça login" : "Criar uma conta");
        isLogin = !isLogin;
    });

    $("#authForm").submit(function (e) {
        e.preventDefault();
        const action = isLogin ? "login" : "register";
        const formData = $(this).serialize() + `&action=${action}`;

        $.post("public/config/crud.php", formData, function (response) {
            alert(response);
            if (response === "success") {
                window.location.href = "admin.html";
            }
        });
    });
});
