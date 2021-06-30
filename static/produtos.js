function fazGet(url){
let request = new XMLHttpRequest()
request.open("GET", url, false)
request.send()
return request.responseText 
}

function criaLinha (usuarios){
    console.log(usuarios)
    linha = document.createElement("tr");
    tdId = document.createElement ("td");
    tdNome = document.createElement ("td");
    tdCategoria = document.createElement ("td");


    tdId.innerHTML = usuarios.id
    tdNome.innerHTML = usuarios.nome
    tdCategoria.innerHTML = usuarios.categoria

    linha.appendChild(tdId);
    linha.appendChild(tdNome);
    linha.appendChild(tdCategoria);


    return linha;
}

function main(){
    let data = fazGet ("http://127.0.0.1:5000/produtos")
    let usuarios = JSON.parse(data);
    let tabela = document.getElementById("tabela")

    usuarios.produto.forEach(element => {
        let linha = criaLinha(element);
        tabela.appendChild(linha);
        
    });

}
main()