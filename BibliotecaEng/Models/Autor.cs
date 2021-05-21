using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Autor
    {
        int id;
        string nome;
        string descricao;
        List<int> LivrosIds;

        public Autor(int id, string nome, string descricao, List<int> livrosIds)
        {
            this.id = id;
            this.nome = nome;
            this.descricao = descricao;
            LivrosIds = livrosIds;
        }
        public Autor(int id, string nome, string descricao)
        {
            this.id = id;
            this.nome = nome;
            this.descricao = descricao;
        }


    }
}
