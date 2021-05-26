using BibliotecaEng.Models;
using BibliotecaEng.UtilBD;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaEng.Views.PlatBibliotecario
{
    public class PlatBibliotecarioController : Controller
    {
        BD Connect = new BD();

        public IActionResult Index()
        {
            return View();
        }
        #region FluxoBiblioteca
        public IActionResult ControleFluxoBiblioteca()
        {
            //Emprestimos,Devoluções,Renovações,Reservas
            return View();
        }
        #endregion
        #region Assinante
        public IActionResult CentralAssinantes(string Pesquisa)
        {
            //Controle Adicionar,Verificar,Alterar,Deletar
            string sql = "";
            int ID;

            try
            {                
                Connect.Abrir();
                if (Pesquisa == null)
                    sql = "SELECT * FROM assinante inner join endereco where ass_ativo=1 and endereco_end_id=end_id";
                else
                {
                    bool IDTest = Int32.TryParse(Pesquisa, out ID);
                    if (IDTest)
                        sql = "SELECT * FROM assinante inner join endereco where ass_ativo=1 and endereco_end_id=end_id and ass_id=" + ID.ToString();
                    else
                        sql = "SELECT * FROM assinante inner join endereco where ass_ativo=1 and endereco_end_id=end_id and ass_nome='" + Pesquisa + "'";
                }

                MySqlDataReader Selecao = Connect.ExecutarSelect(sql);
                ViewBag.Assinantes = Selecao;
            }
            catch (Exception)
            {

                throw;
            }
            return View();
        }
        public IActionResult CadastroAssinante(string Nome, string CPF, string RG, string Login,string Senha, string Logradouro, string Numero, string Bairro, string CEP, string Cidade, string Estado)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "insert into endereco (end_logradouro,end_numero,end_bairro,end_cep,end_cidade,end_estado) VALUES ('#1','#2','#3','#4','#5','#6')";
                sql = sql.Replace("#1", Logradouro);
                sql = sql.Replace("#2", Numero);
                sql = sql.Replace("#3", Bairro);
                sql = sql.Replace("#4", CEP);
                sql = sql.Replace("#5", Cidade);
                sql = sql.Replace("#6", Estado);

                int IDEndereco = Connect.ExecutarNonQueryReturnID(sql);
                if (IDEndereco != 0)
                {
                    sql = "insert into assinante_acesso (aa_login,aa_senha) values ('#1','#2')";
                    sql = sql.Replace("#1", Login);
                    sql = sql.Replace("#2", Senha);
                    int IDAcesso = Connect.ExecutarNonQueryReturnID(sql);
                    if (IDAcesso != 0)
                    {
                        sql = "insert into assinante (ass_nome,ass_cpf,ass_rg,ass_ativo,endereco_end_id,acesso_aa_id) values ('#1','#2','#3',#4,'#5','#6')";
                        sql = sql.Replace("#1", Nome);
                        sql = sql.Replace("#2", CPF);
                        sql = sql.Replace("#3", RG);
                        sql = sql.Replace("#4","1");
                        sql = sql.Replace("#5", IDEndereco.ToString());
                        sql = sql.Replace("#6", IDAcesso.ToString());
                        int IDAssinante = Connect.ExecutarNonQueryReturnID(sql);
                        if(IDAssinante!=0)
                        {
                            msg = "Assinante Adicionado com Sucesso";
                        }
                        else
                        {
                            msg = "Erro ao Adicionar o Assinante";
                            sql = "delete from endereco where end_id=" + IDEndereco;
                            int ExclusaoErro = Connect.ExecutarNonQueryAffected(sql);
                            if (ExclusaoErro == 0)
                                msg = "Problema com o Banco de Dados, solicitar administrador";
                            else
                            {
                                ExclusaoErro = 0;
                                sql = "delete from aa where aa_id=" + IDAcesso;
                                ExclusaoErro = Connect.ExecutarNonQueryAffected(sql);
                                if (ExclusaoErro == 0)
                                    msg = "Problema com o Banco de Dados, solicitar administrador";
                            }
                        }
                    }
                    else
                    {
                        msg = "Erro ao Adicionar Acesso";
                        sql = "delete from endereco where end_id=" + IDEndereco;
                        int ExclusaoErro = Connect.ExecutarNonQueryAffected(sql);
                        if (ExclusaoErro == 0)
                            msg = "Problema com o Banco de Dados, solicitar administrador";
                    }
                }
                else
                {
                    msg = "Erro ao Adicionar o Endereço";
                }

            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult AlterarAssinante(string ID, string Nome, string CPF, string RG, string IDEndereco, string Logradouro, string Numero, string Bairro, string CEP, string Cidade, string Estado)
        {
            bool ok = true;
            string sql = "";
            string msg = "";
            int Affected = 0;
            try
            {
                Connect.Abrir();
                sql = "update assinante set ass_nome='#1',ass_cpf='#2',ass_rg='#3' where ass_id=#4";
                sql = sql.Replace("#1", Nome);
                sql = sql.Replace("#2", CPF);
                sql = sql.Replace("#3", RG);
                sql = sql.Replace("#4", ID.ToString());

                Affected = Connect.ExecutarNonQueryAffected(sql);
                if (Affected > 0)
                {
                    Affected = 0;
                    sql = "update endereco set end_logradouro='#1',end_numero='#2',end_bairro='#3',end_cep='#4',end_cidade='#5',end_estado='#6' where end_id=#7";
                    sql = sql.Replace("#1", Logradouro);
                    sql = sql.Replace("#2", Numero);
                    sql = sql.Replace("#3", Bairro);
                    sql = sql.Replace("#4", CEP);
                    sql = sql.Replace("#5", Cidade);
                    sql = sql.Replace("#6", Estado);
                    sql = sql.Replace("#7", IDEndereco.ToString());
                    Affected = Connect.ExecutarNonQueryAffected(sql);
                    if (Affected > 0)
                    {
                        msg = "Alteração Concluida";
                    }
                    else
                    {
                        ok = false;
                        msg = "Erro ao Atualizar Endereço Assinante";
                    }
                }
                else
                {
                    ok = false;
                    msg = "Erro ao Atualizar Assinante";
                }

            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult ApagarAssinante(string ID, string IDEndereco)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "delete from assinante where ass_id=" + ID;
                if (Connect.ExecutarNonQueryAffected(sql) > 0)
                {
                    sql = "delete from endereco where end_id=" + IDEndereco;
                    if (Connect.ExecutarNonQueryAffected(sql) > 0)
                        msg = "Registro Removido";
                    else
                    {
                        ok = false;
                        msg = "Erro ao Apagar o Registro";
                    }

                }
                else
                {
                    ok = false;
                    msg = "Erro ao Apagar Assinante";
                }
            }
            catch (Exception)
            {

                throw;
            }

            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }
        #endregion
        #region Financeiro
        public IActionResult Financeiro()
        {
            //Controle de Mensalidades
            return View();
        }
        #endregion
        #region Livros
        public IActionResult CentralLivros(string Pesquisa)
        {
            string sql = "";
            int ID;

            try
            {
                Connect.Abrir();
                if(Pesquisa==null)
                    sql = "Select * from livro l inner join autor_livro al on al.liv_id = l.liv_id Inner join autor a on a.aut_id = al.aut_id Inner join editora e on e.edi_id = l.editora_edi_id Inner join estoque es on es.est_id = l.estoque_est_id";
                else
                {
                    bool IDTest = Int32.TryParse(Pesquisa,out ID);
                    if (IDTest)
                        sql = "Select * from livro l inner join autor_livro al on al.liv_id = l.liv_id Inner join autor a on a.aut_id = al.aut_id Inner join editora e on e.edi_id = l.editora_edi_id Inner join estoque es on es.est_id = l.estoque_est_id where l.liv_id=" + ID.ToString();
                    else
                        sql = "Select * from livro l inner join autor_livro al on al.liv_id = l.liv_id Inner join autor a on a.aut_id = al.aut_id Inner join editora e on e.edi_id = l.editora_edi_id Inner join estoque es on es.est_id = l.estoque_est_id where l.liv_nome='" + Pesquisa + "'";

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

        public IActionResult CadastroLivro(string Nome,string NomeOri,string Ano,string Paginas,string Estoque,string Desc,string Editora,string Autores)
        {
            bool ok = true;
            string sql = "";
            string msg = "";
            MySqlDataReader Auxiliar;
            string IdAutor="";
            string IdEditora="";
            try
            {
                Connect.Abrir();

                sql = "select aut_id from autor where aut_nome='"+Autores+"'";
                Auxiliar = Connect.ExecutarSelect(sql);
                
                if(Auxiliar.Read())
                    IdAutor = Auxiliar.GetString("aut_id");

                Auxiliar.Close();

                sql = "select edi_id from editora where edi_nome='" + Editora + "'";
                Auxiliar = Connect.ExecutarSelect(sql);

                if (Auxiliar.Read())
                    IdEditora = Auxiliar.GetString("edi_id");

                Auxiliar.Close();

                sql = "insert into estoque (est_qtde) values (#1)";
                sql = sql.Replace("#1", Estoque);
                int IdEstoque=Connect.ExecutarNonQueryReturnID(sql);

                sql = "insert into livro (liv_nome,liv_desc,liv_ativo,liv_paginas,liv_nome_original,liv_ano_publicacao,editora_edi_id,estoque_est_id) values ('#1','#2','#3','#4','#5','#6','#7','#8')";
                sql = sql.Replace("#1", Nome);
                sql = sql.Replace("#2", Desc);
                sql = sql.Replace("#3","1");
                sql = sql.Replace("#4", Paginas);
                sql = sql.Replace("#5", NomeOri);
                sql = sql.Replace("#6", Ano);
                sql = sql.Replace("#7", IdEditora);
                sql = sql.Replace("#8", IdEstoque.ToString());
                int IdLivro = Connect.ExecutarNonQueryReturnID(sql);
                if(IdLivro>0)
                {
                    msg = "Ok";
                }
                else
                {
                    msg = "Problema ao Inserir o Livro";
                }
            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult AlterarLivro(string ID, string Nome, string CPF, string RG, string IDEndereco, string Logradouro, string Numero, string Bairro, string CEP, string Cidade, string Estado)
        {
            bool ok = true;
            string sql = "";
            string msg = "";
            int Affected = 0;
            try
            {
                Connect.Abrir();
                sql = "update assinante set ass_nome='#1',ass_cpf='#2',ass_rg='#3' where ass_id=#4";
                sql = sql.Replace("#1", Nome);
                sql = sql.Replace("#2", CPF);
                sql = sql.Replace("#3", RG);
                sql = sql.Replace("#4", ID.ToString());

                Affected = Connect.ExecutarNonQueryAffected(sql);
                if (Affected > 0)
                {
                    Affected = 0;
                    sql = "update endereco set end_logradouro='#1',end_numero='#2',end_bairro='#3',end_cep='#4',end_cidade='#5',end_estado='#6' where end_id=#7";
                    sql = sql.Replace("#1", Logradouro);
                    sql = sql.Replace("#2", Numero);
                    sql = sql.Replace("#3", Bairro);
                    sql = sql.Replace("#4", CEP);
                    sql = sql.Replace("#5", Cidade);
                    sql = sql.Replace("#6", Estado);
                    sql = sql.Replace("#7", IDEndereco.ToString());
                    Affected = Connect.ExecutarNonQueryAffected(sql);
                    if (Affected > 0)
                    {
                        msg = "Alteração Concluida";
                    }
                    else
                    {
                        ok = false;
                        msg = "Erro ao Atualizar Endereço Assinante";
                    }
                }
                else
                {
                    ok = false;
                    msg = "Erro ao Atualizar Assinante";
                }

            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult ApagarLivro(string ID, string IDEndereco)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "delete from assinante where ass_id=" + ID;
                if (Connect.ExecutarNonQueryAffected(sql) > 0)
                {
                    sql = "delete from endereco where end_id=" + IDEndereco;
                    if (Connect.ExecutarNonQueryAffected(sql) > 0)
                        msg = "Registro Removido";
                    else
                    {
                        ok = false;
                        msg = "Erro ao Apagar o Registro";
                    }

                }
                else
                {
                    ok = false;
                    msg = "Erro ao Apagar Assinante";
                }
            }
            catch (Exception)
            {

                throw;
            }

            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public String EditorasDisponiveis()
        {
            string sql = "";
            int ID; 
            MySqlDataReader Selecao;

            try
            {
                Connect.Abrir();

                sql = "SELECT * FROM editora";
                Selecao = Connect.ExecutarSelect(sql);

                StringBuilder sb = new StringBuilder();
                StringWriter sw = new StringWriter(sb);

                using (JsonWriter jsonWriter = new JsonTextWriter(sw))
                {
                    jsonWriter.WriteStartArray();

                    while (Selecao.Read())
                    {
                        jsonWriter.WriteStartObject();

                        int fields = Selecao.FieldCount;

                        for (int i = 0; i < fields; i++)
                        {
                            jsonWriter.WritePropertyName(Selecao.GetName(i));
                            jsonWriter.WriteValue(Selecao[i]);
                        }

                        jsonWriter.WriteEndObject();
                    }

                    jsonWriter.WriteEndArray();

                    return sw.ToString();
                }

            }
            catch (Exception)
            {

                throw;
            }

        }

        public string AutoresDisponiveis()
        {
            string sql = "";
            int ID;
            MySqlDataReader Selecao;

            try
            {
                Connect.Abrir();

                sql = "SELECT * FROM Autor";
                Selecao = Connect.ExecutarSelect(sql);

                StringBuilder sb = new StringBuilder();
                StringWriter sw = new StringWriter(sb);

                using (JsonWriter jsonWriter = new JsonTextWriter(sw))
                {
                    jsonWriter.WriteStartArray();

                    while (Selecao.Read())
                    {
                        jsonWriter.WriteStartObject();

                        int fields = Selecao.FieldCount;

                        for (int i = 0; i < fields; i++)
                        {
                            jsonWriter.WritePropertyName(Selecao.GetName(i));
                            jsonWriter.WriteValue(Selecao[i]);
                        }

                        jsonWriter.WriteEndObject();
                    }

                    jsonWriter.WriteEndArray();

                    return sw.ToString();
                }

            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion
        #region Autores
        public IActionResult CentralAutores(string Pesquisa)
        {
            string sql = "";
            int ID;

            try
            {
                Connect.Abrir();
                if (Pesquisa == null)
                    sql = "Select * from autor";
                else
                {
                    bool IDTest = Int32.TryParse(Pesquisa, out ID);
                    if (IDTest)
                        sql = "Select * from autor where aut_id=" + ID.ToString();
                    else
                        sql = "Select * from autor where aut_nome='" + Pesquisa + "'";

                }
                MySqlDataReader Selecao = Connect.ExecutarSelect(sql);
                ViewBag.Autores = Selecao;
            }
            catch (Exception)
            {

                throw;
            }
            return View();
        }

        public IActionResult CadastroAutor(string Nome, string Desc, string DataNasc, string Cidade, string Pais)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "insert into autor (aut_nome,aut_descricao,aut_nascimento,aut_cidade,aut_pais) VALUES ('#1','#2','#3','#4','#5')";
                sql = sql.Replace("#1", Nome);
                sql = sql.Replace("#2", Desc);
                sql = sql.Replace("#3", DataNasc);
                sql = sql.Replace("#4", Cidade);
                sql = sql.Replace("#5", Pais);

                int IDAutor = Connect.ExecutarNonQueryReturnID(sql);
                if (IDAutor != 0)
                {
                    msg = "Autor Adicionado";
                }
                else
                {
                    msg = "Erro ao Adicionar o Autor";
                }

            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult AlterarAutor(string ID,string Nome, string Desc, string DataNasc, string Cidade, string Pais)
        {
            bool ok = true;
            string sql = "";
            string msg = "";
            int Affected = 0;
            try
            {
                Connect.Abrir();
                sql = "update autor set aut_nome='#1',aut_descricao='#2',aut_nascimento='#3',aut_cidade='#4',aut_pais='#5' where aut_id=#6";
                sql = sql.Replace("#1", Nome);
                sql = sql.Replace("#2", Desc);
                sql = sql.Replace("#3", DataNasc);
                sql = sql.Replace("#4", Cidade);
                sql = sql.Replace("#5", Pais);
                sql = sql.Replace("#6", ID.ToString());

                Affected = Connect.ExecutarNonQueryAffected(sql);
                if (Affected > 0)
                {
                    msg = "Alteração Concluida";
                }
                else
                {
                    ok = false;
                    msg = "Erro ao Atualizar Autor";
                }

            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult ApagarAutor(string ID)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "delete from autor where aut_id=" + ID;
                if (Connect.ExecutarNonQueryAffected(sql) > 0)
                {
                    msg = "Registro Removido";
                }
                else
                {
                    ok = false;
                    msg = "Erro ao Apagar Autor";
                }
            }
            catch (Exception)
            {

                throw;
            }

            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }
        #endregion
        #region Editora
        public IActionResult CentralEditoras(string Pesquisa)
        {
            //Controle Adicionar,Verificar,Alterar,Deletar
            string sql = "";
            int ID;

            try
            {
                Connect.Abrir();
                if (Pesquisa == null)
                    sql = "SELECT * FROM editora inner join endereco where endereco_end_id=end_id";
                else
                {
                    bool IDTest = Int32.TryParse(Pesquisa, out ID);
                    if (IDTest)
                        sql = "SELECT * FROM editora inner join endereco where endereco_end_id=end_id and edi_id="+ID.ToString();
                    else
                        sql = "SELECT * FROM editora inner join endereco where endereco_end_id=end_id and edi_nome='"+Pesquisa+"'";

                }
                MySqlDataReader Selecao = Connect.ExecutarSelect(sql);
                ViewBag.Editoras = Selecao;
            }
            catch (Exception)
            {

                throw;
            }
            return View();
        }

        public IActionResult CadastroEditora(string Nome,string Desc,string CNPJ, string Contato,string Logradouro,string Numero,string Bairro,string CEP, string Cidade, string Estado)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "insert into endereco (end_logradouro,end_numero,end_bairro,end_cep,end_cidade,end_estado) VALUES ('#1','#2','#3','#4','#5','#6')";
                sql = sql.Replace("#1", Logradouro);
                sql = sql.Replace("#2", Numero);
                sql = sql.Replace("#3", Bairro);
                sql = sql.Replace("#4", CEP);
                sql = sql.Replace("#5", Cidade);
                sql = sql.Replace("#6", Estado);

                int IDEndereco = Connect.ExecutarNonQueryReturnID(sql);
                if(IDEndereco != 0)
                {
                    sql = "insert into editora (edi_nome,edi_desc,edi_cnpj,edi_fone,endereco_end_id) values ('#1','#2','#3','#4',#5)";
                    sql = sql.Replace("#1", Nome);
                    sql = sql.Replace("#2", Desc);
                    sql = sql.Replace("#3", CNPJ);
                    sql = sql.Replace("#4", Contato);
                    sql =sql.Replace("#5", IDEndereco.ToString());
                    int IDEditora = Connect.ExecutarNonQueryReturnID(sql);
                    if(IDEditora!=0)
                    {
                        msg = "Editora Adicionada com Sucesso";
                    }
                    else
                    {
                        msg = "Erro ao Adicionar Editora";
                        sql = "delete from endereco where end_id=" + IDEndereco;
                        int ExclusaoErro = Connect.ExecutarNonQueryAffected(sql);
                        if (ExclusaoErro == 0)
                            msg = "Problema com o Banco de Dados, solicitar administrador";
                    }
                }
                else
                {
                    msg = "Erro ao Adicionar o Endereço";
                }
                    
            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg=msg
            });
        }

        public IActionResult AlterarEditora(string ID,string Nome, string Desc, string CNPJ, string Contato,string IDEndereco ,string Logradouro, string Numero, string Bairro, string CEP, string Cidade, string Estado)
        {
            bool ok = true;
            string sql = "";
            string msg = "";
            int Affected=0;
            try
            {
                Connect.Abrir();
                sql= "update editora set edi_nome='#1',edi_desc='#2',edi_cnpj='#3',edi_fone='#4' where edi_id=#5";
                sql = sql.Replace("#1", Nome);
                sql = sql.Replace("#2", Desc);
                sql = sql.Replace("#3", CNPJ);
                sql = sql.Replace("#4", Contato);
                sql = sql.Replace("#5", ID.ToString());

                Affected = Connect.ExecutarNonQueryAffected(sql);
                if (Affected > 0)
                {
                    Affected = 0;
                    sql = "update endereco set end_logradouro='#1',end_numero='#2',end_bairro='#3',end_cep='#4',end_cidade='#5',end_estado='#6' where end_id=#7";
                    sql = sql.Replace("#1", Logradouro);
                    sql = sql.Replace("#2", Numero);
                    sql = sql.Replace("#3", Bairro);
                    sql = sql.Replace("#4", CEP);
                    sql = sql.Replace("#5", Cidade);
                    sql = sql.Replace("#6", Estado);
                    sql = sql.Replace("#7", IDEndereco.ToString());
                    Affected = Connect.ExecutarNonQueryAffected(sql);
                    if(Affected>0)
                    {
                        msg = "Alteração Concluida";
                    }
                    else
                    {
                        ok = false;
                        msg = "Erro ao Atualizar Endereço Editora";
                    }
                }
                else
                {
                    ok = false;
                    msg = "Erro ao Atualizar Editora";
                }

            }
            catch (Exception)
            {

                throw;
            }

            Connect.Fechar();
            return Json(new
            {
                Ok = ok,
                msg = msg
            });
        }

        public IActionResult ApagarEditora(string ID,string IDEndereco)
        {
            bool ok = true;
            string sql = "";
            string msg = "";

            try
            {
                Connect.Abrir();
                sql = "delete from editora where edi_id="+ID;
                if(Connect.ExecutarNonQueryAffected(sql)>0)
                {
                    sql = "delete from endereco where end_id=" + IDEndereco;
                    if (Connect.ExecutarNonQueryAffected(sql) > 0)
                        msg = "Registro Removido";
                    else
                    {
                        ok = false;
                        msg = "Erro ao Apagar o Registro";
                    }
                        
                }
                else
                {
                    ok = false;
                    msg = "Erro ao Apagar Editora";
                }
            }
            catch (Exception)
            {

                throw;
            }

            return Json(new
            {
                Ok = ok,
                msg=msg
            });
        }
        #endregion
    }
}
