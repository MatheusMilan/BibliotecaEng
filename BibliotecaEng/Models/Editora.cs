using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Editora
    {
        public Editora()
        {
        }

        public Editora(int iD, string nome, string desc, string cNPJ, string contato, int enderecodId)
        {
            ID = iD;
            Nome = nome;
            Desc = desc;
            CNPJ = cNPJ;
            Contato = contato;
            EnderecodId = enderecodId;
        }

        public int ID { get; set; }
        public string Nome { get; set; }
        public string Desc { get; set; }
        public string CNPJ { get; set; }
        public string Contato { get; set; }
        public int EnderecodId { get; set; }
    }
}
