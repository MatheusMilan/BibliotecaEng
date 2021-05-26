function AdicionarAutor() {
    document.getElementById("tabelaAutor").hidden = true;
    var Carregamento = "";
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Nome Autor</label> <input class="form-control" required="" type="text" id="AddNome" value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Nascimento Autor</label>  <input class="form-control" required="" type="text" id="AddDataNasc" ' + 'onkeypress="$(this).mask(' + "'00/00/0000'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Descrição Autor</label> <input class="form-control" required="" type="text" id="AddDesc" value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Cidade Autor</label>  <input class="form-control" required="" type="text" id="AddCidade" value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Pais Autor</label> <select class="form-control" required="" type="text" id="AddPais" " value=""> </select> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + '</br> <button onclick="CancelarAddAutor()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';

    document.getElementById("AdicionarAutor").innerHTML = Carregamento;
    document.getElementById("AdicionarAutor").style.marginBottom = "10%";

    $.getJSON('/paises-gentilicos-google-maps.json', function (data) {

        var options = '<option value="">escolha um Pais</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome_pais + '">' + val.nome_pais + '</option >';
        });
        $("#AddPais").html(options);
    });
}

function SalvarNovo() {
    var Dados = {
        Nome: document.getElementById("AddNome").value,
        Desc: document.getElementById("AddDesc").value,
        DataNasc: document.getElementById("AddDataNasc").value,
        Cidade: document.getElementById("AddCidade").value,
        Pais: document.getElementById("AddPais").value
    }

    $.get('/PlatBibliotecario/CadastroAutor', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
    document.getElementById("AdicionarAutor").style.marginBottom = "0%";
}

function CancelarAddAutor() {
    document.getElementById("tabelaAutor").hidden = false;
    document.getElementById("AdicionarAutor").innerHTML = "";
    document.getElementById("AdicionarAutor").style.marginBottom = "0%";
}

function CarregarAlterar(id) {
    var Carregamento = "";
    Carregamento = Carregamento + '<th scope="row" id="AltId">' + id + '</th> ';
    Carregamento = Carregamento + '<th> <input type="text" id="AltNome ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltDesc ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltDataNasc ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltCidade ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <select type="text" id="AltPais' + id + '" value="" /> </select> </th>';
    Carregamento = Carregamento + '<th> <button id="' + id + '" onclick="Cancelar(this.id)"> Cancelar </button> </th>' + '<th> <button id="' + id + '"onclick="AlterarSalvar(this.id)"> Salvar </button> </th>';

    document.getElementById("AcaoID " + id).innerHTML = Carregamento;

    document.getElementById("AltNome " + id).value = document.getElementById("Nome " + id).innerHTML;
    document.getElementById("AltDesc " + id).value = document.getElementById("Desc " + id).innerHTML;
    document.getElementById("AltDataNasc " + id).value = document.getElementById("DataNasc " + id).innerHTML;
    document.getElementById("AltCidade " + id).value = document.getElementById("Cidade " + id).innerHTML;
    document.getElementById("AltPais" + id).value = document.getElementById("Pais " + id).innerHTML;

    var estadoValor = document.getElementById("Pais " + id).innerHTML;

    $.getJSON('/paises-gentilicos-google-maps.json', function (data) {

        var options = '<option value="">escolha um Pais</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome_pais + '"';
            if (val.nome_pais === estadoValor)
                options += 'selected';
            options += '>' + val.nome_pais + '</option>';
        });
        var NameDiv = "#AltPais" + id;
        $(NameDiv).html(options);
    });

}

function AlterarSalvar(id) {

    var Dados = {
        ID: id,
        Nome:document.getElementById("AltNome " + id).value,
        Desc:document.getElementById("AltDesc " + id).value,
        DataNasc:document.getElementById("AltDataNasc " + id).value,
        Cidade:document.getElementById("AltCidade " + id).value,
        Pais:document.getElementById("AltPais" + id).value
    }
    $.get('/PlatBibliotecario/AlterarAutor', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
}


function DeletarAutor(id) {
    var Dados = {
        ID: id
    }
    $.get('/PlatBibliotecario/ApagarAutor', Dados).done(function (result) {
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
    $("#tabelaAutor tr").remove();
    var Pesquisa = document.getElementById("BuscaAutor").value;
    window.location.href = "/PlatBibliotecario/CentralAutoress?Pesquisa=" + Pesquisa
}
