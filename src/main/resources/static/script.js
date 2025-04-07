addEventListener("DOMContentLoaded", () => {
    getUserList()
})
const api_url = "http://localhost:8080/api/users"
async function getUserList() {
    try {
        const response = await fetch(api_url)
        if (!response.ok) {
            console.log(response)
            throw new Error(`Response ${response.status}`)
        }

        const json = await response.json()
        console.log(json)
        let html = ""
        json.forEach(e => {
            html += `<tr scope=\"row\"><td>${e.id}</td> <td ">${e.imie}</td><td >${e.email}</td><td><button class=\"btn btn-success m-1\" onclick=\"edit(this,${e.id})\">edytuj</button><button class=\"btn btn-danger m-1\" onclick=\"fetchDelete(${e.id})\">usuń</button></td></tr>`
        });
        document.querySelector("tbody").innerHTML = html

    } catch (error) {
        console.error(error.message)
    }
}
function edit(o, id) {
    
    let fields = o.parentElement.parentElement.children
    let imie = fields[1].innerHTML
    let email = fields[2].innerHTML
    console.log(imie,email)

    let inputImie = `<input id=\"imie\" type=\"text\" value=\"${imie}\">`
    let inputEmail = `<input id=\"email\" type=\"text\" value=\"${email}\">`

    fields[1].innerHTML = inputImie
    fields[2].innerHTML = inputEmail
    fields[3].innerHTML = `<button class=\"btn btn-info\" onclick=\"fetchEdit(${id},this)\" >Zapisz</button>`
}
async function fetchEdit(id,o){
    let imie = document.querySelector("#imie").value
    let email = document.querySelector("#email").value
    const response = await fetch(api_url+`/${id}`,
        {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id":id,"imie":imie,"email":email})
        })
    console.log(response)
    getUserList()
}
async function fetchDelete(id){
    const response = await fetch(api_url+`/${id}`,
        {
            method: "DELETE"
        }
    )
    console.log(response)
    if(response.ok){
        getUserList()
    }
}

function newUser(){
    document.querySelector("tbody").innerHTML += "<tr scope=\"row\"><td>X</td><td><input id=\"imie\" type=\"text\"></td><td><input id=\"email\" type=\"text\"></td><td><button class=\"btn btn-primary\" onclick=\"fetchNewUser(this)\" >Utwórz Użytkownika</button></td></tr>"
}

async function fetchNewUser(o) {
    console.log(o.parentElement.previousElementSibling.firstChild.value)

    let email = o.parentElement.previousElementSibling.firstChild.value
    let imie = o.parentElement.previousElementSibling.previousElementSibling.firstChild.value
    
    const response = await fetch(api_url,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"imie":imie,"email":email})
        }

    )
    console.log(response)
    if(response.ok){
        getUserList()
    }
}