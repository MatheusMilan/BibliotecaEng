function AdicionarLivro() {
    document.getElementById("AdicionarLivro").innerHTML = '<label>Nome Livro</label> <input class="form-control" type="text" id="AddNome" value="" /> </br> <label>Descrição Livro</label> <input class="form-control" type="text" id="AddDesc" value="" /> </br> <label>Paginas Livro</label>  <input  class="form-control" type="text" name="AddPaginas" value="" /> </br><button class="btn-primary" onclick="CancelarAddLivro()"> Cancelar </button>' + '<button class="btn-primary" onclick="SalvarNovo()"> Salvar </button>';
}

function SalvarNovo() {

}
function CancelarAddLivro() {
    document.getElementById("AdicionarLivro").innerHTML = "";
}


function CarregarStatus(id) {
    //Buscar Situação Emprestimo
}

function CarregarAlterar(id) {
    document.getElementById("AcaoID " + id).innerHTML = '<th scope="row" id="AltId">' + id + '</th>' + '<th> <input type="text" id="AltNome" value="" /> </th>' + '<th> <input type="text" id="AltDesc" value="" /> </th>' + '<th> <input type="text" id="AltPaginas" value="" /> </th>' + '<th> <button id="'+id+'" onclick="Cancelar(this.id)"> Cancelar </button> </th>' + '<th> <button> Salvar </button> </th>' ;
}

function AlterarSalvar() {

}

function CarregarDeletar(id) {
    //BuscarSituação emprestimo/reserva caso haja informar após , confirmação de Apagar
}

function DeletarConfirmar(id) {

}

function Cancelar(id) {
    document.getElementById("AcaoID " + id).innerHTML="";
}

function Buscar() {
    $("#tabelaLivros tr").remove(); 
    var Pesquisa = document.getElementById("BuscaLivro").value;
    window.location.href = "/PlatBibliotecario/CentralLivros?Pesquisa=" + Pesquisa
}

