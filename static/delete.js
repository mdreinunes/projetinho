function fazDelete(deleteUrl){
    let request = new XMLHttpRequest()
    request.open("DELETE", deleteUrl, false)
    request.setRequestHeader("content-type","application/json")
    request.send(fazDelete)

    request.onload = function(){
        console.log(this.responseText)

    }

    return request.responseText
}




function deletaProduto(){
    event.preventDefault()
    let url = 'http://127.0.0.1:5000/produto/'
    let id = document.getElementById("id").value
    let deleteUrl = `${url}${id}`
    console.log(id)



    fazDelete(deleteUrl)

}