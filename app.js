const TBODY = document.getElementById("tbody");
const PREV_BTN = document.getElementById("prev");
const NEXT_BTN = document.getElementById("next");

function format(number, suffix){
    if(number=="unknown") return "unknown";
    let text = new Intl.NumberFormat().format(number)
    return text + suffix
}

function manageButtons(nextURL, prevURL){
    if(nextURL){
        NEXT_BTN.onclick = function(){
            disableButtons();
            getPlanets(nextURL);
        }
        NEXT_BTN.disabled = false;
    } else {
        NEXT_BTN.disabled = true;
    }
    if(prevURL){
        PREV_BTN.onclick = function(){
            disableButtons();
            getPlanets(prevURL);
        }
        PREV_BTN.disabled = false;
    } else {
        PREV_BTN.disabled = true;
    }
}
function disableButtons(){
    NEXT_BTN.disabled = true;
    PREV_BTN.disabled = true;
}
function getPlanets(url){
    TBODY.innerHTML = '';
    fetch(url).then((response)=>{
        if(response.ok){
            return response.json()
        }
        console.error('wtf');
    }, (error)=>{
        console.error(error);
        alert('please try again');
    }).then((data)=>{
        data.results.forEach((planet)=>{
            let row = document.createElement("tr")
            trHTML = `
                <td>${planet.name}</td>
                <td>${format(planet.diameter, " km")}</td>
                <td>${planet.climate}</td>
                <td>${planet.terrain}</td>
                <td>${format(planet.surface_water, "%")}</td>
                <td>${format(planet.population, " people")}</td>
            `;
            row.innerHTML = trHTML;
            TBODY.appendChild(row);
        })
        manageButtons(data.next, data.previous);
    }, (error)=>{
        console.error(error);
        alert("please try again");
    })
}

function startApp(){
    const url = "https://swapi.dev/api/planets";
    getPlanets(url);
}
startApp()
