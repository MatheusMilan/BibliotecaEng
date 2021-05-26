using BibliotecaEng.UtilBD;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Views.PlatUsuario
{
    public class PlatUsuarioController : Controller
    {
        BD Connect = new BD();
        public IActionResult Index()
        {
            //Apresentar Emprestimos com Datas em uma Tabela
            return View();
        }

        public IActionResult PainelUsuario()
        {
            //Painel para Edição de Dados do Usuario
            return View();
        }

        public IActionResult SituacaoFinanceira()
        {
            
            return View();
        }

        public IActionResult BuscaAcervo(string Pesquisa)
        {
            //Buscar no Acervo e opção de Reserva de Livro
            string sql = "";
            int ID;

            try
            {
                Connect.Abrir();
                if (Pesquisa == null)
                    sql = "Select * from livro";
                else
                {
                    bool IDTest = Int32.TryParse(Pesquisa, out ID);
                    if (IDTest)
                        sql = "Select * from livro where liv_id=" + ID.ToString();
                    else
                        sql = "Select * from livro where liv_nome='" + Pesquisa + "'";

                }
                MySqlDataReader Selecao = Connect.ExecutarSelect(sql);
                ViewBag.Livros = Selecao;
            }
            catch (Exception)
            {

                throw;
            }

            return View();
        }
        
    }
}
