using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Bibliotecario
    {
        int id;
        string nome;
        string cpf;
        string rg;
        int ativo;
        int idEndereco;
        int idBibliotecarioAcesso;

        public Bibliotecario(int id, string nome, string cpf, string rg, int ativo, int idEndereco, int idBibliotecarioAcesso)
        {
            this.id = id;
            this.nome = nome;
            this.cpf = cpf;
            this.rg = rg;
            this.ativo = ativo;
            this.idEndereco = idEndereco;
            this.idBibliotecarioAcesso = idBibliotecarioAcesso;
        }

        public Bibliotecario(int id, string nome, string cpf, string rg, int ativo)
        {
            this.id = id;
            this.nome = nome;
            this.cpf = cpf;
            this.rg = rg;
            this.ativo = ativo;
        }


    }
}
