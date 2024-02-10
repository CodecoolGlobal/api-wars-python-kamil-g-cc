function format(number, suffix){
    if(number=="unknown") return "unknown";
    let text = new Intl.NumberFormat().format(number)
    return text + suffix
}

fetch("https://swapi.dev/api/planets").then((response)=>{
    if(response.ok){
        return response.json()
    }
}).then((data)=>{
    let tbody = document.getElementById("tbody")
    data.results.forEach((planet)=>{
        let row = document.createElement("tr")
        trHTML = `
            <td>${planet.name}</td>
            <td>${planet.diameter}</td>
            <td>${planet.climate}</td>
            <td>${planet.terrain}</td>
            <td>${format(planet.surface_water, "%")}</td>
            <td>${format(planet.population, " people")}</td>
        `;
        row.innerHTML = trHTML;
        tbody.appendChild(row);
    })
})
