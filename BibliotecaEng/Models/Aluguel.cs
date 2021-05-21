using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Aluguel
    {
        int id;
        DateTime dataRetirada;
        DateTime dataVencimento;
        DateTime dataDevolucao;
        int assinanteID;
        List<int> idLivros;

        public Aluguel(int id, DateTime dataRetirada, DateTime dataVencimento, DateTime dataDevolucao, int assinanteID, List<int> idLivros)
        {
            this.id = id;
            this.dataRetirada = dataRetirada;
            this.dataVencimento = dataVencimento;
            this.dataDevolucao = dataDevolucao;
            this.assinanteID = assinanteID;
            this.idLivros = idLivros;
        }
    }
}
