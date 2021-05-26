using BibliotecaEng.Models;
using BibliotecaEng.UtilBD;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Controllers
{
    public class HomeController : Controller
    {
        BD Connect = new BD();

        public IActionResult Teste()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Contato()
        {
            return View();
        }

        public IActionResult SobreNos()
        {
            return View();
        }

        public string UsuarioLogin(string login, string senha)
        {
            try
            {
                Connect.Abrir();
                MySqlDataReader Selecao = Connect.ExecutarSelect("SELECT * FROM ASSINANTE_ACESSO WHERE AA_LOGIN='" + login + "' AND AA_SENHA='" + senha + "'");
                if (Selecao.HasRows)
                {
                    Selecao.Read();
                    return Selecao.GetString("aa_id");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            Connect.Fechar();
            return "";
        }

        public string BibliotecarioLogin(string login, string senha)
        {

            try
            {
                Connect.Abrir();
                MySqlDataReader Selecao = Connect.ExecutarSelect("SELECT * FROM BIBLIOTECARIO_ACESSO WHERE BA_LOGIN='" + login + "' AND BA_SENHA='" + senha+"'");
                if(Selecao.HasRows)
                {
                    Selecao.Read();
                    return Selecao.GetString("ba_id");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            Connect.Fechar();
            return "";
        }


    }
}
