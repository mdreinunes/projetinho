function fazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}


function cadastraProduto() {
    event.preventDefault()
    let url = "http://127.0.0.1:5000/produto"
    let nome = document.getElementById("nome").value
    let categoria = document.getElementById("categoria").value

    console.log(nome)
    console.log(categoria)

    body = {
        "nome": nome,
        "categoria": categoria
    }

    fazPost(url, body)
}