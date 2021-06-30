function fazGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}


function criaLinha(produto){
    linha = document.createElement("tr");
    tdId = document.createElement("td");
    tdNome = document.createElement("td");
    tdCategoria = document.createElement("td");
    
    tdId.innerHTML = produto.id
    tdNome.innerHTML = produto.nome 
    tdCategoria.innerHTML = produto.categoria

    linha.appendChild(tdId);
    linha.appendChild(tdNome);
    linha.appendChild(tdCategoria);

    return linha;
}

function selecionaProduto(){
    event.preventDefault()
    let id = document.getElementById("id").value
    let url = 'http://127.0.0.1:5000/produtos/'
    let selectUrl = fazGet(`${url}${id}`)
    let produto = JSON.parse(selectUrl); 
    let tabela = document.getElementById("tabela");
        let linha = criaLinha(produto.produto);
        tabela.appendChild(linha);
        
}