using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Assinante
    {
        int id;
        string nome;
        string cpf;
        string rg;
        int ativo;
        int idEndereco;
        int idAssinanteAcesso;

        public Assinante(int id, string nome, string cpf, string rg, int ativo, int idEndereco, int idAssinanteAcesso)
        {
            this.id = id;
            this.nome = nome;
            this.cpf = cpf;
            this.rg = rg;
            this.ativo = ativo;
            this.idEndereco = idEndereco;
            this.idAssinanteAcesso = idAssinanteAcesso;
        }
        public Assinante(int id, string nome, string cpf, string rg, int ativo)
        {
            this.id = id;
            this.nome = nome;
            this.cpf = cpf;
            this.rg = rg;
            this.ativo = ativo;
        }
    }
}
