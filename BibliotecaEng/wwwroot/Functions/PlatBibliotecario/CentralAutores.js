function AdicionarAutor() {
    document.getElementById("AdicionarAutor").innerHTML = '<label>Nome Autor</label> <input class="form-control" type="text" id="AddNome" value="" /> </br>  <label>Descrição Autor</label> <input class="form-control" type="text" id="AddDesc" value="" /> </br> <label>Data Nascimento Autor</label>  <input class="form-control" type="text" name="AddDataNasc" value="" /> </br> <label>Cidade Nascimento Autor</label>  <input class="form-control" type="text" name="AddCidNasc" value="" /> </br> <label>Pais Autor</label>  <input class="form-control" type="text" name="Pais" value="" /> </br> <button onclick="CancelarAddAutor()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';
}

function SalvarNovo() {

}
function CancelarAddAutor() {
    document.getElementById("AdicionarAutor").innerHTML = "";
}


function CarregarAlterar(id) {
    document.getElementById("AcaoID " + id).innerHTML = '<th scope="row" id="AltId">' + id + '</th>' + '<th> <input type="text" id="AltNome" value="" /> </th>' + '<th> <input type="text" id="AltDesc" value="" /> </th>' + '<th> <input type="text" id="AltPaginas" value="" /> </th>' + '<th> <button id="' + id + '" onclick="Cancelar(this.id)"> Cancelar </button> </th>' + '<th> <button> Salvar </button> </th>';
}

function AlterarSalvar() {

}

function CarregarDeletar(id) {
    //BuscarSituação emprestimo/reserva caso haja informar após , confirmação de Apagar
}

function DeletarConfirmar(id) {

}

function Cancelar(id) {
    document.getElementById("AcaoID " + id).innerHTML = "";
}

function Buscar() {
    $("#tabelaAutor tr").remove();
    var Pesquisa = document.getElementById("BuscaAutor").value;
    window.location.href = "/PlatBibliotecario/CentralAutores?Pesquisa=" + Pesquisa
}

