function AdicionarLivro() {
    document.getElementById("tabelaLivro").hidden = true;
    var Carregamento = "";
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Nome Livro</label> <input class="form-control" type="text" id="AddNome" value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Nome Original Livro</label> <input class="form-control" type="text" id="AddNomeOri" value="" /> </br>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Descricao Livro</label>  <input class="form-control" type="text" id="AddDesc" ' + 'onkeypress="$(this).mask(' + "'00.000.000/0000-00'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Paginas Livro</label>  <input class="form-control" type="text" id="AddPaginas" ' + ' onkeypress="$(this).mask(' + "'(00) 0000-00009'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + '<label>Editora Livro</label> <select class="form-control" type="text" id="AddEditora" value="" /> </select>';
    Carregamento = Carregamento + '</br> <button onclick="CancelarAddLivro()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';


    document.getElementById("AdicionarLivro").innerHTML = Carregamento;
    document.getElementById("AdicionarLivro").style.marginBottom = "10%";

    var x="";
    $.get("/PlatBibliotecario/EditorasDisponiveis", function (data) {
        const obj = JSON.parse(data);
        for (x in obj) {
            alert(obj[x].edi_id)
            alert(obj[x].edi_nome)
        }
    });
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

    $.get('/PlatBibliotecario/CadastroLivro', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
    document.getElementById("AdicionarLivro").style.marginBottom = "0%";
}

function CancelarAddLivro() {
    document.getElementById("tabelaLivro").hidden = false;
    document.getElementById("AdicionarLivro").innerHTML = "";
    document.getElementById("AdicionarLivro").style.marginBottom = "0%";
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
    Carregamento = Carregamento + '<th> <input type="text" id="AltCidade ' + id + '"" value="" /> </th>';
    Carregamento = Carregamento + '<select OnChange="CarregaCidades()" class="form-control" type="text" id="AltEstado ' + id + '" value=""> </select> </br>';
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
    document.getElementById("AltEstado " + id).value = document.getElementById("Estado " + id).innerHTML;
    document.getElementById("AltCidade " + id).value = document.getElementById("Cidade " + id).innerHTML;



    $.getJSON('/estados_cidades.json', function (data) {

        var options = '<option value="">escolha um estado</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome + '">' + val.nome + '</option>';
        });
        var NameDiv = "#AltEstado " + id;
        $(NameDiv).html(options);
    });

}

function AlterarSalvar(id) {

    var Dados = {
        ID: id,
        Nome: document.getElementById("AltNome " + id).value,
        Desc: document.getElementById("AltDesc " + id).value,
        CNPJ: document.getElementById("AltCNPJ " + id).value,
        Contato: document.getElementById("AltContato " + id).value,
        IDEndereco: document.getElementById("IDEndereco " + id).innerHTML,
        Logradouro: document.getElementById("AltLogradouro " + id).value,
        Numero: document.getElementById("AltNumero " + id).value,
        Bairro: document.getElementById("AltBairro " + id).value,
        CEP: document.getElementById("AltCEP " + id).value,
        Cidade: document.getElementById("AltCidade " + id).value,
        Estado: document.getElementById("AltEstado " + id).value,
    }
    $.get('/PlatBibliotecario/AlterarLivro', Dados).done(function (result) {
        alert(result.msg);
        document.location.reload(true);
    }).fail(function () {
        Alert('erro', 'Ocorreu um erro');
    });
}


function DeletarLivro(id) {
    var Dados = {
        ID: id,
        IDEndereco: document.getElementById("IDEndereco " + id).innerHTML
    }
    $.get('/PlatBibliotecario/ApagarLivro', Dados).done(function (result) {
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
    $("#tabelaLivro tr").remove();
    var Pesquisa = document.getElementById("BuscaLivro").value;
    window.location.href = "/PlatBibliotecario/CentralLivros?Pesquisa=" + Pesquisa
}
