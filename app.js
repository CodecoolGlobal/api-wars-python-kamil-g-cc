let xhr = new XMLHttpRequest();
const tbody = document.getElementById("tbody");

function onReady(){
    if(this.readyState != 4) return
    let results = JSON.parse(xhr.responseText);
    results.results.forEach((el)=>{
        let newRow = createTr(el);
        tbody.appendChild(newRow);
        
    })
    
}
function createTr(el){
    let newRow =  document.createElement("tr");
    newRow.innerHTML = `<td>${el.name}</td>\
        <td>${new Intl.NumberFormat("en-US").format(el.diameter)} km</td>\
        <td>${el.climate}</td>\
        <td>${el.terrain}</td>\
        <td>${(el.surface_water!="unknown"?el.surface_water+"%":"unknown")}</td>\
        <td>${(el.population!="unknown"?"".concat(new Intl.NumberFormat("en-US").format(el.population)):"unknown").concat(" people")}</td>\
        `;
    return newRow;
}
xhr.onreadystatechange = onReady;
xhr.open("GET", "https://swapi.dev/api/planets");
xhr.send()

