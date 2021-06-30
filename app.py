from operator import methodcaller
from flask import Flask, Response, Request, request
from flask_sqlalchemy import SQLAlchemy
import os
import urllib.parse 
import json
from flask_cors import CORS

from werkzeug.wrappers import response

# conexão do banco: 
params = urllib.parse.quote_plus("DRIVER={SQL Server};SERVER=projetinho.database.windows.net;DATABASE=projetinhodePython;UID=projetinho.felas;PWD=Qwe123!@#")

# start do banco
app = Flask (__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = 'supersecret'
app.config['SQLALCHEMY_DATABASE_URI'] = "mssql+pyodbc:///?odbc_connect=%s" % params
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

# extensions
db = SQLAlchemy(app)
class Produtos (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column (db.String(100))
    categoria = db.Column(db.String(100))

    def to_json(self):
        return {"id":self.id, "nome":self.nome, "categoria":self.categoria}

# selecionar tudo
@app.route("/produtos", methods=["GET"])
def selecionar_produtos():
    produtos_classe = Produtos.query.all()
    produtos_json = [produtos.to_json() for produtos in produtos_classe] 

    return gera_response(200, "produto", produtos_json, "OK")

# selecionar um
@app.route("/produtos/<id>", methods=["GET"])
def selecionar_produto(id):
    produto_classe = Produtos.query.filter_by(id=id).first()
    produto_json = produto_classe.to_json()

    return gera_response(200, "produto", produto_json, "OK")

# criar
@app.route("/produto", methods=["POST"])
def criar_produto():
    body = request.get_json()

    try:
        produto = Produtos(nome=body ["nome"], categoria= body ["categoria"])
        db.session.add(produto)
        db.session.commit()

        return gera_response(201, "produto", produto.to_json(), "Criado com sucesso")
    except Exception as e:
        print (e)
        return gera_response(400, "produto", {}, "Erro ao cadastrar")    

# att
@app.route("/produtos/<id>", methods=["PUT"])
def atualizar_produto(id): 
    produto_classe = Produtos.query.filter_by(id=id).first()
    body = request.get_json()

    try:
        if('nome' in body):
            produto_classe.nome = body ['nome']

        if('categoria' in body):
            produto_classe.categoria = body ['categoria']

        db.session.add(produto_classe)
        db.session.commit()    
        return gera_response(201, "produto", produto_classe.to_json(), "Atualizado!")
    except Exception as e:
        print (e)
        return gera_response(400, "produto", {}, "Erro ao atualizar") 

# delet
@app.route("/produto/<id>", methods= ["DELETE"])
def deletar_produto(id):
    produto_classe = Produtos.query.filter_by(id=id).first()

    try:
        db.session.delete(produto_classe)
        db.session.commit()
        return gera_response(201, "produto", produto_classe.to_json(), "Deletado com sucesso")
    except Exception as e:
        print (e)
        return gera_response(400, "produto", {}, "Erro ao deletar") 

# metodo
def gera_response (status, nome_do_conteudo, conteudo, mensagem=False):
    body = {}
    body[nome_do_conteudo] = conteudo

    if(mensagem):
        body["mensagem"] = mensagem

    return Response (json.dumps(body), status=status, mimetype="application/json") 
    
app.run()