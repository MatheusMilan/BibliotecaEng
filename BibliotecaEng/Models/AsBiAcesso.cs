using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaEng.Models
{
    public class AsBiAcesso
    {
        int id;
        string login;
        string senha;

        public AsBiAcesso(int id, string login, string senha)
        {
            this.id = id;
            this.login = login;
            this.senha = senha;
        }


    }
}
