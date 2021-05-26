function AdicionarEditora() {
    document.getElementById("tabelaEditora").hidden = true;
    var Carregamento = "";
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Nome Editora</label> <input class="form-control" required type="text" id="AddNome" value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Descrição Editora</label> <input class="form-control" required type="text" id="AddDesc" value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>CNPJ Editora</label>  <input class="form-control" type="text" required id="AddCNPJ" ' + 'onkeypress="$(this).mask(' + "'00.000.000/0000-00'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Contato Editora</label>  <input class="form-control" type="text" required id="AddContato" ' + ' onkeypress="$(this).mask(' + "'(00) 0000-00009'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + '<label>Logradouro Editora</label> <input class="form-control" required type="text" id="AddLogradouro" value="" /> </br> ';
    Carregamento = Carregamento + '<label>Numero Editora</label> <input class="form-control" type="text" required id="AddNumero" value="" /> </br> ';
    Carregamento = Carregamento + '<label>Bairro Editora</label> <input class="form-control" type="text" required id="AddBairro" value="" /> </br> ';
    Carregamento = Carregamento + '<label>CEP Editora</label> <input class="form-control" required type="text" id="AddCEP" ' + ' onkeypress = "$(this).mask(' + "'00.000-000'" + ')"' + ' value="" /> </br> ';
    Carregamento = Carregamento + '<label>Estado Editora</label> <select OnChange="CarregaCidades()" required class="form-control" type="text" id="AddEstado" value=""> </select> </br>';
    Carregamento = Carregamento + '<label>Cidade Editora</label> <select class="form-control" type="text" required id="AddCidade" value="" /> </select>';
    Carregamento = Carregamento + '</br> <button onclick="CancelarAddEditora()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';

    $.getJSON('/estados_cidades.json', function (data) {

        var options = '<option value="">escolha um estado</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome + '">' + val.nome + '</option>';
        });
        $("#AddEstado").html(options);
    });

    document.getElementById("AdicionarEditora").innerHTML = Carregamento;
    document.getElementById("AdicionarEditora").style.marginBottom = "10%";
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

        $("#" +id+ " option:selected").each(function () {
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

        $("#"+Div).html(options_cidades);
    });
}

function SalvarNovo() {
    var Dados = {
        Nome: document.getElementById("AddNome").value,
        Desc: document.getElementById("AddDesc").value,
        CNPJ: document.getElementById("AddCNPJ").value,
        Contato: document.getElementById("AddContato").value,
        Logradouro: document.getElementById("AddLogradouro").value,
        Numero: document.getElementById("AddNumero").value,
        Bairro: document.getElementById("AddBairro").value,
        CEP: document.getElementById("AddCEP").value,
        Cidade: document.getElementById("AddCidade").value,
        Estado: document.getElementById("AddEstado").value
    }

    $.get('/PlatBibliotecario/CadastroEditora', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
    document.getElementById("AdicionarEditora").style.marginBottom = "0%";
}

function CancelarAddEditora() {
    document.getElementById("tabelaEditora").hidden = false;
    document.getElementById("AdicionarEditora").innerHTML = "";
    document.getElementById("AdicionarEditora").style.marginBottom = "0%";
}

function CarregarAlterar(id) {
    var Carregamento = "";
    Carregamento = Carregamento + '<th scope="row" id="AltId">' + id + '</th> ';
    Carregamento = Carregamento + '<th> <input type="text" id="AltNome ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltDesc ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltCNPJ ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltContato ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltLogradouro ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltNumero ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltBairro ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltCEP ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<select OnChange="CarregaCidadesAlt(this.id)" class="form-control" type="text" id="AltEstado' + id + '" value=""> </select> </br>';
    Carregamento = Carregamento + '<th> <select type="text" class="form-control" id="AltCidade' + id + '"" value="" /> </select> </th>';
    Carregamento = Carregamento + '<th> <button id="' + id + '" onclick="Cancelar(this.id)"> Cancelar </button> </th>' + '<th> <button id="' + id + '"onclick="AlterarSalvar(this.id)"> Salvar </button> </th>';

    document.getElementById("AcaoID " + id).innerHTML = Carregamento;

    document.getElementById("AltNome " + id).value = document.getElementById("Nome " + id).innerHTML;
    document.getElementById("AltDesc " + id).value = document.getElementById("Desc " + id).innerHTML;
    document.getElementById("AltCNPJ " + id).value = document.getElementById("CNPJ " + id).innerHTML;
    document.getElementById("AltContato " + id).value = document.getElementById("Contato " + id).innerHTML;
    document.getElementById("AltLogradouro " + id).value = document.getElementById("Logradouro " + id).innerHTML;
    document.getElementById("AltNumero " + id).value = document.getElementById("Numero " + id).innerHTML;
    document.getElementById("AltBairro " + id).value = document.getElementById("Bairro " + id).innerHTML;
    document.getElementById("AltCEP " + id).value = document.getElementById("CEP " + id).innerHTML;
    document.getElementById("AltEstado" + id).value = document.getElementById("Estado " + id).innerHTML;
    document.getElementById("AltCidade" + id).value = document.getElementById("Cidade " + id).innerHTML;

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
        Nome:document.getElementById("AltNome " + id).value,
        Desc:document.getElementById("AltDesc " + id).value,
        CNPJ:document.getElementById("AltCNPJ " + id).value,
        Contato: document.getElementById("AltContato " + id).value,
        IDEndereco: document.getElementById("IDEndereco " + id).innerHTML,
        Logradouro:document.getElementById("AltLogradouro " + id).value,
        Numero:document.getElementById("AltNumero " + id).value,
        Bairro:document.getElementById("AltBairro " + id).value,
        CEP:document.getElementById("AltCEP " + id).value,
        Cidade:document.getElementById("AltCidade " + id).value,
        Estado:document.getElementById("AltEstado " + id).value,
    }
    $.get('/PlatBibliotecario/AlterarEditora', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
}


function DeletarEditora(id) {
    var Dados = {
        ID: id,
        IDEndereco:document.getElementById("IDEndereco " + id).innerHTML
    }
    $.get('/PlatBibliotecario/ApagarEditora', Dados).done(function (result) {
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
    $("#tabelaEditora tr").remove();
    var Pesquisa = document.getElementById("BuscaEditora").value;
    window.location.href = "/PlatBibliotecario/CentralEditoras?Pesquisa=" + Pesquisa
}
