using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Endereco
    {
        int id;
        string logradouro;
        int numero;
        string bairro;
        int cep;
        string cidade;
        string estado;

        public Endereco(int id, string logradouro, int numero, string bairro, int cep, string cidade, string estado)
        {
            this.id = id;
            this.logradouro = logradouro;
            this.numero = numero;
            this.bairro = bairro;
            this.cep = cep;
            this.cidade = cidade;
            this.estado = estado;
        }
    }
}
