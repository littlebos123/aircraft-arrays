let aircrafts;
fetch("aircrafts.json").then(response => response.json())
    .then(json => {

        aircrafts = json;
        for(let i = 0; i < aircrafts.length; i++) {
            
            let aircraft = aircrafts[i];

            // create new aircraft card in aircraft-section
            let aircraftSection = document.querySelector("#aircrafts");
            let newAircraft = document.createElement("div");
            newAircraft.classList.add("card");

            newAircraft.innerHTML = `
            <h2 class="aircraftMake">${aircraft.Make} ${aircraft.Model}</h2>
            <p>Category: ${aircraft.Category} |
            Class: ${aircraft.Class} |
            Max Capacity: ${aircraft.Max_Capacity}</p>
            <img class="aircraftCover" src="${aircraft.path}" alt="${aircraft.alttext}" />
            `

            aircraftSection.appendChild(newAircraft);

        } // for
    })

// icecream dropdown test 
// const selectElement = document.querySelector(".make");
// const result = document.querySelector(".result");

// selectElement.addEventListener("change", (event) => {
//   result.textContent = `You like ${event.target.value}`;
// });

// ------------------
// generating an aircraft card
function makeAircraft(aircraft) {
    let aircraftSection = document.querySelector("#aircrafts");
    // let specs = aircraft.specs.split(",");
    let newAircraft = document.createElement("div")

    newAircraft.classList.add("card");
    newAircraft.innerHTML = `
            <h2 class="aircraftMake">${aircraft.Make}</h2>
            <h3 class="aircraftModel">${aircraft.Model}</h2>
            <p>Category: ${aircraft.Category} |
            Class: ${aircraft.Class} |
            Max Capacity: ${aircraft.Max_Capacity}</p>
            <img class="aircraftCover" src="${aircraft.path}" alt="${aircraft.alttext}" />
            `

            // specsList.classList.add("specs");
            // for (let i = 0; i < specs.length; i++) {
            //     specsList.innerHTML += `<span>${specs[i]}</span>`
            // } // for

            aircraftSection.appendChild(newAircraft);
            
} // makeAircraft

// ------------------
// CREATE CLASS FILTER
function createClassFilter(classFilter) {
    document.querySelector(`[data-class="${classFilter}"]`).addEventListener("click", function(event) {
        let selectedClassFilter = event.target;
        let selectedClass = selectedClassFilter.getAttribute("data-class");
        let aircraftsSection = document.querySelector("#aircrafts");
        aircraftsSection.innerHTML = "" // empty section before generating filtered data
        let filters = document.querySelectorAll(".filter");

        // search for matches
        for (let i=0; i < aircrafts.length; i++) {
            let aircraft = aircrafts[i];
            let classes = aircraft.Class.split(",")
            
            if (classes.includes(`${classFilter}`) || selectedClass === "All") {
                makeAircraft(aircraft);
            } // if
        } // for

        // remove and set filter element type
        styleFilters(filters, selectedClass)
    })
} // createClassFilter

// ------------------
// ...

// ------------------
// FILTERS
createClassFilter("All");
createClassFilter("Single-engine");
createClassFilter("Multi-engine");
createClassFilter("No-engine");

// ------------------
// STYLE FILTERS
function styleFilters(filters, selected) {
    for (let i = 0; i <filters.length; i++) {
        let filter = filters[i];
        if (filter.getAttribute("data-class") === selected) {
            filter.classList.add("selected");
        } else {
            filter.classList.remove("selected");
        } // if else
    } // for
} // styleFilters