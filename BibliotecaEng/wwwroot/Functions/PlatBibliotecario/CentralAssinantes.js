function AdicionarAssinante() {
    document.getElementById("AdicionarAssinante").innerHTML = '<label>Informacoes Perfil</label> </br> <label>Nome Assinante</label> <input class="form-control" type="text" id="AddNome" value="" /> </br> <label>CPF Assinante</label> <input class="form-control" type="text" id="AddCPF" value="" /> </br> <label>RG Assinante</label>  <input class="form-control" type="text" name="AddRG" value="" /> </br> <label>Login Assinante</label> <input class="form-control" type="text" id="AddLogin" value="" /> </br> <label>Senha Assinante</label> <input class="form-control" type="text" id="AddSenha" value="" /> </br> <label>Logradouro Assinante</label> <input class="form-control" type="text" id="AddLogradouro" value="" /> </br> <label>Numero Assinante</label> <input class="form-control" type="text" id="AddNumero" value="" /> </br> <label>Bairro Assinante</label> <input class="form-control" type="text" id="AddBairro" value="" /> </br> <label>CEP Assinante</label> <input class="form-control" type="text" id="AddCEP" value="" /> </br> <label>Cidade Assinante</label> <input class="form-control" type="text" id="AddCidade" value="" /> </br> <label>Estado Assinante</label> <input class="form-control" type="text" id="AddEstado" value="" /> </br> <button onclick="CancelarAddAssinante()"> Cancelar </button>' + ' <button onclick="SalvarNovo()"> Salvar </button>';
}

function SalvarNovo() {

    var Logradouro = document.getElementById("AddLogradouro").value;
    var Numero = document.getElementById("AddNumero").value;
    var Bairro = document.getElementById("AddBairro").value;
    var CEP = document.getElementById("AddCEP").value;
    var Cidade = document.getElementById("AddCidade").value;
    var Estado = document.getElementById("AddEstado").value;
}
function CancelarAddAssinante() {
    document.getElementById("AdicionarAssinante").innerHTML = "";
}


function CarregarStatus(id) {
    //Buscar Situação Emprestimo
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
    $("#tabelaAssinante tr").remove();
    var Pesquisa = document.getElementById("BuscaAssinante").value;
    window.location.href = "/PlatBibliotecario/CentralAssinantes?Pesquisa=" + Pesquisa
}

