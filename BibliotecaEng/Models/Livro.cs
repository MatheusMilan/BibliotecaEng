using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class Livro
    {
        int id;
        string nome;
        string desc;
        int ativo;
        int paginas;
        int estoqueID;
        int EditoraID;

        public Livro(int id, string nome, string desc, int ativo, int paginas, int estoqueID, int editoraID)
        {
            this.id = id;
            this.nome = nome;
            this.desc = desc;
            this.ativo = ativo;
            this.paginas = paginas;
            this.estoqueID = estoqueID;
            EditoraID = editoraID;
        }


    }
}
