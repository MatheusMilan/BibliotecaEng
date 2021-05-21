using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Views.PlatUsuario
{
    public class PlatUsuarioController : Controller
    {
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

        public IActionResult BuscaAcervo()
        {
            //Buscar no Acervo e opção de Reserva de Livro
            return View();
        }
        
    }
}
