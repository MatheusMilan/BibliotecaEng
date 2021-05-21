function Acessar() {

    var Dados = {
        login: document.getElementById("UsuarioNome").value,
        senha: document.getElementById("UsuarioSenha").value
    };

    if (Dados.login.startsWith("BT")) {
        $.post('/Home/BibliotecarioLogin', Dados).done(function (result) {
            if(result)
                window.location.href = "/PlatBibliotecario/Index";
        }).fail(function () {

        })
    }
    else {
        $.post('/Home/UsuarioLogin', Dados).done(function (result) {
            if (result)
                window.location.href = "/PlatUsuario/Index";
        }).fail(function () {

        })
    }
}