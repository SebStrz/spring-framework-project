const api_user = "http://localhost:8080/api/users"
const api_score = "http://localhost:8080/api/scores"

addEventListener("DOMContentLoaded", async () => {
    tableResize()
    let json = await getUsers()
    createUsersSelect(json)
    let usersSelect = document.querySelector("#usersSelect")
    localStorage.setItem("userid",usersSelect.value)
    usersSelect.addEventListener("change", (e) => {
        localStorage.setItem("userid",usersSelect.value)
    })
})
window.addEventListener("resize", (event) => {
    tableResize()
})
function tableResize(){
    if ( window.innerWidth <= 840 ){
        let elements = document.querySelectorAll(".mx-auto")
        elements.forEach( (e) => {
            e.classList.replace("mx-auto","disabled-mx-auto")
        })

    }else if( window.innerWidth > 840){
        let elements = document.querySelectorAll(".disabled-mx-auto")
        elements.forEach( (e) => {
            e.classList.replace("disabled-mx-auto", "mx-auto")
        })
    }
}


async function getUsers(){
    try {
        const response = await fetch(api_user)
        if (!response.ok) {
            console.log(response)
            throw new Error(`Response ${response.status}`)
        }
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error.message)
    }
}
async function createUsersSelect(json){
    let html = ""
    let userid = localStorage.getItem("userid")
    if(userid != null){
        json.forEach(e => {
            if (e.id == userid){
                html += `<option value=\"${e.id}\" selected>${e.imie} id:${e.id}</option>`
            }else{
            html += `<option value=\"${e.id}\">${e.imie} id:${e.id}</option>`
            }
        });
    }else{
        json.forEach(e => {
            html += `<option value=\"${e.id}\">${e.imie} id:${e.id}</option>`
        });
    }
    document.querySelector("#usersSelect").innerHTML = html
}



