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
    Carregamento = Carregamento + '<label>Ano Publicação Livro</label>  <input class="form-control" type="text" id="AddAno" ' + 'onkeypress="$(this).mask(' + "'0000'" + ')"' + 'value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Paginas Livro</label>  <input class="form-control" type="text" id="AddPaginas" value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Estoque Livro</label>  <input class="form-control" type="text" id="AddEstoque" value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Descricao Livro</label>  <input class="form-control" type="text" id="AddDesc" value="" /> </br> ';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "<div class='row'>"
    Carregamento = Carregamento + "<div class='col'>"
    Carregamento = Carregamento + '<label>Autores Livro</label </br>';
    Carregamento = Carregamento + '<select class="form-control" type="text" id="AddAutores" value="" /> </select>';
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + "</div>"
    Carregamento = Carregamento + '<label>Editora Livro</label> <select class="form-control" type="text" id="AddEditora" value="" /> </select>';
    Carregamento = Carregamento + '</br> <button onclick="CancelarAddLivro()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';


    document.getElementById("AdicionarLivro").innerHTML = Carregamento;
    document.getElementById("AdicionarLivro").style.marginBottom = "10%";

    var x="";
    $.get("/PlatBibliotecario/AutoresDisponiveis", function (data) {
        const obj = JSON.parse(data);
        var options = "";
        for (x in obj) {
            options += '<option value="' + obj[x].aut_nome + '">' + obj[x].aut_nome + '</option>';
        }
        $("#AddAutores").html(options);
    });

    $.get("/PlatBibliotecario/EditorasDisponiveis", function (data) {
        const obj = JSON.parse(data);
        var options = "";
        for (x in obj) {
            options += '<option value="' + obj[x].edi_nome + '">' + obj[x].edi_nome + '</option>';
        }
        $("#AddEditora").html(options);
    });
}

function SalvarNovoLivro()
{

}

function SalvarNovo() {
    var Dados = {
        Nome: document.getElementById("AddNome").value,
        NomeOri: document.getElementById("AddNomeOri").value,
        Ano: document.getElementById("AddAno").value,
        Paginas: document.getElementById("AddPaginas").value,
        Estoque: document.getElementById("AddEstoque").value,
        Desc: document.getElementById("AddDesc").value,
        Editora: document.getElementById("AddEditora").value,
        Autores: document.getElementById("AddAutores").value,
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
    Carregamento = Carregamento + '<th> <input type="text" id="AltNomeOri ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltAno ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltPaginas ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltDesc ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltEditora ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltAutores ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <input type="text" id="AltEstoque ' + id + '" value="" /> </th>';
    Carregamento = Carregamento + '<th> <button id="' + id + '" onclick="Cancelar(this.id)"> Cancelar </button> </th>' + '<th> <button id="' + id + '"onclick="AlterarSalvar(this.id)"> Salvar </button> </th>';

    document.getElementById("AcaoID " + id).innerHTML = Carregamento;

    document.getElementById("AltNome " + id).value = document.getElementById("Nome " + id).innerHTML;
    document.getElementById("AltNomeOri " + id).value = document.getElementById("NomeOri " + id).innerHTML;
    document.getElementById("AltAno " + id).value = document.getElementById("Ano " + id).innerHTML;
    document.getElementById("AltPaginas " + id).value = document.getElementById("Paginas " + id).innerHTML;
    document.getElementById("AltDesc " + id).value = document.getElementById("Desc " + id).innerHTML;
    document.getElementById("AltEditora " + id).value = document.getElementById("Editora " + id).innerHTML;
    document.getElementById("AltAutores " + id).value = document.getElementById("Autores " + id).innerHTML;
    document.getElementById("AltEstoque " + id).value = document.getElementById("Estoque " + id).innerHTML;

    var x = "";
    $.get("/PlatBibliotecario/AutoresDisponiveis", function (data) {
        const obj = JSON.parse(data);
        var options = "";
        for (x in obj) {
            options += '<option value="' + obj[x].aut__nome + '">' + obj[x].aut_nome + '</option>';
        }
        $("#AltAutores "+id).html(options);
    });

    $.get("/PlatBibliotecario/EditorasDisponiveis", function (data) {
        const obj = JSON.parse(data);
        var options = "";
        for (x in obj) {
            options += '<option value="' + obj[x].edi_nome + '">' + obj[x].edi_nome + '</option>';
        }
        $("#AltEditora "+id).html(options);
    });
}

function AlterarSalvar(id) {

    var Dados = {
        ID: id,
        Nome:document.getElementById("AltNome " + id).value,
        NomeOri:document.getElementById("AltNomeOri " + id).value,
        Ano:document.getElementById("AltAno " + id).value,
        Paginas:document.getElementById("AltPaginas " + id).value,
        Desc:document.getElementById("AltDesc " + id).value,
        Editora:document.getElementById("AltEditora " + id).value,
        Autores: document.getElementById("AltAutores " + id).value,
        Estoque: document.getElementById("AltEstoque " + id).value,
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
        ID: id
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
