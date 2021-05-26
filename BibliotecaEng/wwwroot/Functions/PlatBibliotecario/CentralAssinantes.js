function AdicionarAssinante() {
    document.getElementById("tabelaAssinante").hidden = true;
    var Carregamento = "";
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Nome Assinante</label> <input class="form-control" type="text" id="AddNome" required value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>CPF Assinante</label>  <input class="form-control" type="text" required id="AddCPF" ' + 'onkeypress="$(this).mask(' + "'000.000.000-00'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>RG Assinante</label>  <input class="form-control" required type="text" id="AddRG" ' + ' onkeypress="$(this).mask(' + "'00.000.000-0'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Login Assinante</label>  <input class="form-control" required type="text" id="AddLogin" value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Senha Assinante</label>  <input class="form-control" required type="text" id="AddSenha" value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + '<label>Logradouro Assinante</label> <input class="form-control" required type="text" id="AddLogradouro" value="" /> </br> ';
    Carregamento = Carregamento + '<label>Numero Assinante</label> <input class="form-control" required type="text" id="AddNumero" value="" /> </br> ';
    Carregamento = Carregamento + '<label>Bairro Assinante</label> <input class="form-control" required type="text" id="AddBairro" value="" /> </br> ';
    Carregamento = Carregamento + '<label>CEP Assinante</label> <input class="form-control" required type="text" required id="AddCEP" ' + ' onkeypress = "$(this).mask(' + "'00.000-000'" + ')"' + ' value="" /> </br> ';
    Carregamento = Carregamento + '<label>Estado Assinante</label> <select OnChange="CarregaCidades()" class="form-control" type="text" required id="AddEstado" value=""> </select> </br>';
    Carregamento = Carregamento + '<label>Cidade Assinante</label> <select class="form-control" type="text" id="AddCidade" value="" required /> </select>';
    Carregamento = Carregamento + '</br> <button onclick="CancelarAddAssinante()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';

    $.getJSON('/estados_cidades.json', function (data) {

        var options = '<option value="">escolha um estado</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome + '">' + val.nome + '</option>';
        });
        $("#AddEstado").html(options);
    });

    document.getElementById("AdicionarAssinante").innerHTML = Carregamento;
    document.getElementById("AdicionarAssinante").style.marginBottom = "10%";
}

function CarregaCidades() {
    $.getJSON('/estados_cidades.json', function (data) {
        var options_cidades = '';
        var str = "";

        $("#AddEstado option:selected").each(function () {
            str += $(this).text();
        });

        $.each(data, function (key, val) {
            if (val.nome == str) {
                $.each(val.cidades, function (key_city, val_city) {
                    options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                });
            }
        });

        $("#AddCidade").html(options_cidades);
    });
}

function CarregaCidadesAlt(id) {
    $.getJSON('/estados_cidades.json', function (data) {
        var options_cidades = '';
        var str = "";

        $("#" + id + " option:selected").each(function () {
            str += $(this).text();
        });

        $.each(data, function (key, val) {
            if (val.nome == str) {
                $.each(val.cidades, function (key_city, val_city) {
                    options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                });
            }
        });
        var Div = id.replace("AltEstado", "AltCidade");

        $("#" + Div).html(options_cidades);
    });
}

function SalvarNovo() {
    var Dados = {
        Nome: document.getElementById("AddNome").value,
        CPF: document.getElementById("AddCPF").value,
        RG: document.getElementById("AddRG").value,
        Login: document.getElementById("AddLogin").value,
        Senha: document.getElementById("AddSenha").value,
        Logradouro: document.getElementById("AddLogradouro").value,
        Numero: document.getElementById("AddNumero").value,
        Bairro: document.getElementById("AddBairro").value,
        CEP: document.getElementById("AddCEP").value,
        Cidade: document.getElementById("AddCidade").value,
        Estado: document.getElementById("AddEstado").value
    }

    $.get('/PlatBibliotecario/CadastroAssinante', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
    document.getElementById("AdicionarAssinante").style.marginBottom = "0%";
}

function CancelarAddAssinante() {
    document.getElementById("tabelaAssinante").hidden = false;
    document.getElementById("AdicionarAssinante").innerHTML = "";
    document.getElementById("AdicionarAssinante").style.marginBottom = "0%";
}

function CarregarAlterar(id) {
    var Carregamento = "";
    Carregamento = Carregamento + '<th scope="row" id="AltId">' + id + '</th> ';
    Carregamento = Carregamento + '<th> <input type="text" id="AltNome ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltCPF ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltRG ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltLogradouro ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltNumero ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltBairro ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltCEP ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <select type="text" class="form-control" id="AltCidade' + id + '"" value="" /> </select> </th>';
    Carregamento = Carregamento + '<select OnChange="CarregaCidadesAlt(this.id)" class="form-control" type="text" id="AltEstado' + id + '" value=""> </select> </br>';
    Carregamento = Carregamento + '<th> <button id="' + id + '" onclick="Cancelar(this.id)"> Cancelar </button> </th>' + '<th> <button id="' + id + '"onclick="AlterarSalvar(this.id)"> Salvar </button> </th>';

    document.getElementById("AcaoID " + id).innerHTML = Carregamento;

    document.getElementById("AltNome " + id).value = document.getElementById("Nome " + id).innerHTML;
    document.getElementById("AltCPF " + id).value = document.getElementById("CPF " + id).innerHTML;
    document.getElementById("AltRG " + id).value = document.getElementById("RG " + id).innerHTML;
    document.getElementById("AltLogradouro " + id).value = document.getElementById("Logradouro " + id).innerHTML;
    document.getElementById("AltNumero " + id).value = document.getElementById("Numero " + id).innerHTML;
    document.getElementById("AltBairro " + id).value = document.getElementById("Bairro " + id).innerHTML;
    document.getElementById("AltCEP " + id).value = document.getElementById("CEP " + id).innerHTML;
    document.getElementById("AltCidade" + id).value = document.getElementById("Cidade " + id).innerHTML;
    document.getElementById("AltEstado" + id).value = document.getElementById("Estado " + id).innerHTML;

    var estadoValor = document.getElementById("Estado " + id).innerHTML;

    $.getJSON('/estados_cidades.json', function (data) {

        var options = '<option value="">escolha um estado</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome + '"';
            if (val.nome === estadoValor)
                options += 'selected';
            options += '>' + val.nome + '</option>';
        });
        var NameDiv = "#AltEstado" + id;
        $(NameDiv).html(options);
    });

        var estadoValorCidade = document.getElementById("Cidade " + id).innerHTML;

    $.getJSON('/estados_cidades.json', function (data) {
        var options_cidades = '';
        var str = estadoValor;

        $.each(data, function (key, val) {
            if (val.nome == estadoValor) {
                $.each(val.cidades, function (key_city, val_city) {
                    options_cidades += '<option value="' + val_city;
                    if (val_city == estadoValorCidade)
                        options_cidades += 'selected';
                    options_cidades +='">' + val_city + '</option>';
                });
            }
        });
        var NameDiv = "#AltCidade" + id;
        $(NameDiv).html(options_cidades);
    });

}

function AlterarSalvar(id) {

    var Dados = {
        ID: id,
        Nome: document.getElementById("AltNome " + id).value,
        CPF: document.getElementById("AltCPF " + id).value,
        RG: document.getElementById("AltRG " + id).value,
        IDEndereco: document.getElementById("IDEndereco " + id).innerHTML,
        Logradouro: document.getElementById("AltLogradouro " + id).value,
        Numero: document.getElementById("AltNumero " + id).value,
        Bairro: document.getElementById("AltBairro " + id).value,
        CEP: document.getElementById("AltCEP " + id).value,
        Cidade: document.getElementById("AltCidade " + id).value,
        Estado: document.getElementById("AltEstado " + id).value
    }
    $.get('/PlatBibliotecario/AlterarAssinante', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
}


function DeletarAssinante(id) {
    var Dados = {
        ID: id,
        IDEndereco: document.getElementById("IDEndereco " + id).innerHTML
    }
    $.get('/PlatBibliotecario/ApagarAssinante', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
}

function Cancelar(id) {
    document.getElementById("AcaoID " + id).innerHTML = "";
}

function Buscar() {
    $("#tabelaAssinante tr").remove();
    var Pesquisa = document.getElementById("BuscaAssinante").value;
    window.location.href = "/PlatBibliotecario/CentralAssinantes?Pesquisa=" + Pesquisa
}
