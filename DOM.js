/** Ajout de Event sur le choix du type PlaceHolders à utiliser.
 *  
 */
document.querySelectorAll(".dropdown-item").forEach(
    itemButton => {
        itemButton.addEventListener("click",
            async function (e) {
                const clickSelection = e.target.textContent.toLowerCase()
                const json = await loadData(clickSelection, "freshJson")
                cleanAndFillContainer(createHTMLElementByJson({ "json": json, "id": clickSelection }), "table-receiver")
            }
        )
    }
)

/** Add Event listener on search input.
 * 
 */
const searchInput = document.getElementById("search-input")

searchInput.addEventListener("input",
    async function (e) {
        const input = e.target.value
        json = await filteredTable(input, "freshJson")
        cleanAndFillContainer(createHTMLElementByJson({ "json": json, "id": "" }), "table-receiver")
    }
)

/** 
 * Add Event listener on Header to sort column
 */
async function listenOnThClick(target) {
    document.querySelectorAll(target).forEach(th => {
        th.addEventListener("click", async function (e) {
            // Get JSON from localStorage
            const filteredJsonString = await localStorage.getItem("filteredJson");
            const freshJsonString = await localStorage.getItem("freshJson");
            let lastJsonString = filteredJsonString !== "null" ? filteredJsonString : freshJsonString;
            let lastJson = JSON.parse(lastJsonString);

            // Sort logic
            const selectedHeader = e.target.textContent;
            const selectionId = e.target.id;
            const currentClass = e.currentTarget.classList.value;

            // Determine sort order and next class
            const sortOrder = currentClass === "sorted" ? 'desc' : 'asc';
            const nextClass = sortOrder === 'asc' ? "sorted" : (currentClass === "sorted" ? "unsorted" : "sorted");

            // Sort function modified to handle both directions
            lastJson.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[selectedHeader] > b[selectedHeader] ? 1 : -1;
                } else {
                    return a[selectedHeader] < b[selectedHeader] ? 1 : -1;
                }
            });

            // Create new HTML element and update container
            const newElement = createHTMLElementByJson({ "json": lastJson, "id": "" }, { "id": selectionId, "class": nextClass });
            cleanAndFillContainer(newElement, "table-receiver");

            console.log(selectionId);
            console.log("Current class of target =", currentClass);
        });
    });
}

/** Create thead from a json in html format.
 * 
 * @param {object} json 
 * @returns {string} HTML Header in string
 */
function createHeaderFromJson(json, classDOMmodificator = {}) {
    console.log(classDOMmodificator);
    console.log(json);
    
    // Determine the source of headers based on whether json is an array or an object
    const source = Array.isArray(json) ? json[0] : json;
    const headers = Object.keys(source);

    // Generate HTML headers
    const HTMLHeaders = headers.map(head => {
        // Apply class if current head matches the ID from classDOMmodificator
        const isModified = head === classDOMmodificator.id;
        const classAttribute = isModified ? ` class="${classDOMmodificator.class}"` : "";
        return `<th id="${head}"${classAttribute}>${head}</th>`;
    }).join("");

    return HTMLHeaders;
}

/** Create tbody from a json in html format.
 * 
 * @param {json} json 
 * @returns {string} HTML Body in string
 */
function createBodyDataFromJson(json) {

    let HTMLAllBody = ""

    for (const body of json) {
        let HTMLTdBody = ""
        let HTMLTrBody = ""
        const TrBody = []

        for (const td in body) {
            TrBody.push(body[td])
            HTMLTdBody = TrBody.map((td) => {
                const stringifyTdObject = JSON.stringify(td).replaceAll("{", "").replaceAll("}", "").replaceAll('"', "").replaceAll(",", "<br>")
                if (typeof td !== "object") { return `<td>${td}</td>` }
                else { return `<td>${stringifyTdObject}</td>` }
            }).join("")
        }

        HTMLTrBody = `<tr>${HTMLTdBody}<tr>`
        HTMLAllBody += HTMLTrBody
    }

    return HTMLAllBody
}

/**
 * Creates a div containing a table representation of the given JSON.
 * @param {Object} json - The JSON data to represent in a table format.
 * @param {Object} classDOMmodificator - Object containing the ID and class for modifying the header.
 * @returns {Element} - A div element containing a table.
 */
function createHTMLElementByJson(json, classDOMmodificator) {
    console.log("json = ", json.json);

    const newDiv = document.createElement("div");
    newDiv.className = "table-container"; // Use className instead of classList for setting a single class
    newDiv.id = "result-table";

    // Creating the table element separately
    const table = document.createElement("table");
    table.id = "table-view";
    table.className = "table table-hover table-responsive-sm";

    // Create the header and body of the table
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = createHeaderFromJson(json.json, classDOMmodificator);
    tbody.innerHTML = createBodyDataFromJson(json.json);

    // Append thead and tbody to table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to newDiv
    newDiv.appendChild(table);

    return newDiv;
}

/** Take string Input and Local Json name to filter the second by the first.
 * 
 * @param {string} input 
 * @param {string} localJsonName 
 * @returns 
 */
async function filteredTable(input, localJsonName) {

    const stringJson = await localStorage.getItem(localJsonName)

    const json = await JSON.parse(stringJson)

    const tableContainer = document.getElementById("result-table")

    const table = tableContainer.querySelector(".table-container")

    const searchInput = document.getElementById("search-input")

    const filteredJson = await json.filter(function (fjson) {
        //  console.log("json.filter(function",input === fjson.name)
        let isTrue = false
        for (let eachCol in fjson) {
            //  console.log("fjson[eachCol] = ",fjson[eachCol])
            const objectElement = (typeof fjson[eachCol] === "object") ? JSON.stringify(fjson[eachCol]) : fjson[eachCol]
            const stringElement = objectElement.toString()
            const isStringPart = stringElement.toLowerCase().indexOf(input.toLowerCase()) >= 0

            if (isStringPart) {
                isTrue = true
            }
        }
        return isTrue
    })

    await localStorage.setItem("filteredJson", JSON.stringify(filteredJson))
    console.log("filteredJson", filteredJson)
    return filteredJson

}

/** Clean a container and fill with a new Element.
 * 
 * @param {HTMLElement} element 
 * @param {string} receiverClassName 
 */
function cleanAndFillContainer(element, receiverClassName) {

    try {

        const tableReceiver = document.getElementById(receiverClassName)
        const table = document.getElementById("result-table")

        if (table !== null) {
            while (tableReceiver.firstChild) {
                tableReceiver.removeChild(tableReceiver.lastChild);
            }
        }

        else {
            console.log("Pas de table existante, données initiale chargées.")
        }

        tableReceiver.appendChild(element)
        listenOnThClick("th")

    }

    catch { (element) => console.log("erreur" + element) }

}

function HTMLTableToJson(tableId) {
    const table = document.getElementById(tableId);
    if (table) {
        function HTMLTableToJsonTh() {
            const tableHeaders = table.querySelectorAll("th");
            let thObjects = {};
            tableHeaders.forEach(function(tableHeader) {
                thObjects[tableHeader.textContent] = {
                    id: tableHeader.id,
                    class: tableHeader.className
                };
            });
            return JSON.stringify({ th: thObjects });
        }
    
        console.log(HTMLTableToJsonTh());
    
        function HTMLTableToJsonTd() {
            console.log(table.querySelectorAll("tr"));
        }
        HTMLTableToJsonTd();
    }
}

HTMLTableToJson("table-view")