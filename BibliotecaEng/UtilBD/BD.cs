using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace BibliotecaEng.UtilBD
{

    public class BD
    {
        public MySqlConnection _conexao { get; set; }
        public MySqlCommand _cmd { get; set; }

        int _ultimoId;
        public int UltimoId { get => _ultimoId; set => _ultimoId = value; }

        public BD()
        {
            string strCon = "Server=den1.mysql2.gear.host;Database=es2g6h;Uid=es2g6h;Pwd=Bibliotec@";

            _conexao = new MySqlConnection(strCon);
            _cmd = _conexao.CreateCommand();
        }

        public void Abrir()
        {
            if (_conexao.State != System.Data.ConnectionState.Open)
            {
                _conexao.Open();
            }
        }

        public void Fechar()
        {
            _conexao.Close();
        }
        public int ExecutarNonQueryReturnID(string sql, Dictionary<string, object> parametros = null)
        {
            Abrir();
            _cmd.CommandText = sql;

            if (parametros != null)
            {
                foreach (var p in parametros)
                {
                    _cmd.Parameters.AddWithValue(p.Key, p.Value);
                }
            }

            int qtdLinhasAfetadas = _cmd.ExecuteNonQuery();
            if(qtdLinhasAfetadas>0)
            {
                _ultimoId = (int)_cmd.LastInsertedId;
                Fechar();
                return _ultimoId;
            }
            Fechar();
            return qtdLinhasAfetadas;
        }

        public int ExecutarNonQueryAffected(string sql, Dictionary<string, object> parametros = null)
        {
            Abrir();
            _cmd.CommandText = sql;

            if (parametros != null)
            {
                foreach (var p in parametros)
                {
                    _cmd.Parameters.AddWithValue(p.Key, p.Value);
                }
            }

            int qtdLinhasAfetadas = _cmd.ExecuteNonQuery();
            _ultimoId = (int)_cmd.LastInsertedId;
            Fechar();

            return qtdLinhasAfetadas;
        }

        public object ExecutarSelectScalar(string select, Dictionary<string, object> parametros = null)
        {
            object valor = null;

            Abrir();
            _cmd.CommandText = select;

            if (parametros != null)
            {
                foreach (var p in parametros)
                {
                    _cmd.Parameters.AddWithValue(p.Key, p.Value);
                }
            }

            valor = _cmd.ExecuteScalar();

            Fechar();

            return valor;
        }

        public MySqlDataReader ExecutarSelect(string select, Dictionary<string, object> parametros = null)
        {
            Abrir();
            _cmd.CommandText = select;

            if (parametros != null)
            {
                foreach (var p in parametros)
                {
                    _cmd.Parameters.AddWithValue(p.Key, p.Value);
                }
            }

            MySqlDataReader leitorDados = _cmd.ExecuteReader();

            return leitorDados;
        }


    }
}
