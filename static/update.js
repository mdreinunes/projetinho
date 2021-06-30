function fazPost(body, updateUrl) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("PUT", updateUrl, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}


function cadastraProduto() {
    event.preventDefault()
    let url = "http://127.0.0.1:5000/produtos/"
    let id = document.getElementById("id").value
    let nomes = document.getElementById("nome").value
    let categoria = document.getElementById("categoria").value
    let updateUrl = `${url}${id}`
    console.log(updateUrl)

    console.log(nomes)
    console.log(categoria)

    body = {
        "id": id,
        "nome": nomes,
        "categoria": categoria,
    }

    fazPost(body,updateUrl)
}