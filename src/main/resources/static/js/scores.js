addEventListener("DOMContentLoaded", () => {
    getScoresList()
})

async function getScoresList() {
    try {
        const response = await fetch(api_score)
        if (!response.ok) {
            console.log(response)
            throw new Error(`Response ${response.status}`)
        }

        const json = await response.json()
        console.log(json)
        let html = ""
        json.forEach(e => {
            html += `<tr scope=\"row\"><td>${e.id_score}</td> <td ">${e.user.id}</td><td >${e.game}</td>` +
            `<td>${e.score}</td> <td>${e.score_date}</td>`+
            `<td><button class=\"btn btn-success m-1\" onclick=\"edit(this,${e.id_score})\">edytuj</button>` +
            `<button class=\"btn btn-danger m-1\" onclick=\"fetchDelete(${e.id_score})\">usuń</button></td></tr>`
        });
        document.querySelector("tbody").innerHTML = html

    } catch (error) {
        console.error(error.message)
    }
}

async function newScore(){
    const response = await fetch(api_user)
    const json = await response.json()
    html = "<tr scope=\"row\"><td>X</td><td><select id=\"gracz\">"
    json.forEach( (e) => {
        html += `<option value=\"${e.id}\">${e.id} </option>`
    })
    html += "</td><td><input type=\"text\" id=\"game\"></td><td><input type=\"number\" id=\"score\"></td>"+
    "<td><input type=\"date\" id=\"date\"></td><td><button class=\"btn btn-primary\" onclick=\"fetchNewScore(this)\""+
    ">Utwórz Wynik</button></td></tr>"
    document.querySelector("tbody").innerHTML += html
}

async function fetchNewScore(o) {
    let date = o.parentElement.previousElementSibling.firstChild.value
    let score = o.parentElement.previousElementSibling.previousElementSibling.firstChild.value
    let game = o.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.value
    let id_user = o.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.value

    const response = await fetch(api_score,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"user":{"id":id_user},"game":game,"score":score,"score_date":date})
        }

    )
    console.log(response)
    if(response.ok){
        getScoresList()
    }
}
async function fetchDelete(id) {
    const response = await fetch(api_score+`/${id}`,
        {
            method: "DELETE"
        }
    )
    console.log(response)
    if(response.ok){
        getScoresList()
    }
}
async function edit(o, id) {
    
    let users = await getUsers()
    console.log(users)
    let fields = o.parentElement.parentElement.children
    let user_id = fields[1].innerHTML
    let game = fields[2].innerHTML
    let score = fields[3].innerHTML
    let date = fields[4].innerHTML
    

    let inputUserId = "<select id=\"user_id_edit\">"
    users.forEach((e) => {
        if(e.user_id == user_id){
            inputUserId += `<option value=\"${e.id}\" selected>${e.id}</option>`    
        }else{
            inputUserId += `<option value=\"${e.id}\">${e.id}</option>`
        }
    })
    let inputGame = `<input id=\"game_edit\" type=\"text\" value=\"${game}\">`
    let inputScore = `<input id=\"score_edit\" type=\"number\" value=\"${score}\">`
    let inputDate = `<input id=\"date_edit\" type=\"date\" value=\"${date}\">`

    fields[1].innerHTML = inputUserId
    fields[2].innerHTML = inputGame
    fields[3].innerHTML = inputScore
    fields[4].innerHTML = inputDate

    fields[5].innerHTML = `<button class=\"btn btn-info\" onclick=\"fetchEdit(${id},this)\" >Zapisz</button>`
}
async function fetchEdit(id,o){
    let user_id = document.querySelector("#user_id_edit").value
    let game = document.querySelector("#game_edit").value
    let score = document.querySelector("#score_edit").value
    let date = document.querySelector("#date_edit").value
    
    const response = await fetch(api_score+`/${id}`,
        {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": {
                    "id": user_id
                },
                "game": game,
                "score_date": date,
                "score": score
            })
        })
    console.log(response)
    getScoresList()
}
