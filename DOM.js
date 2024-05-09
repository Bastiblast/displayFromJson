function createHeaderFromJson(json){
    const headers = []

    if (json.length === undefined){
   for (const head in json){
        headers.push(head)
   }
    } else {
        for (const head in json[0]){
            headers.push(head)
       }
    }
   const HTMLHeaders = headers.map((head) => `<th>${head}</th>` ).join("")
return HTMLHeaders
}

function createBodyDataFromJson(json){
let HTMLAllBody = ""


    for (const body of json){
        let HTMLTdBody = ""
        let HTMLTrBody = ""
        const TrBody = []
        for (const td in body){
            TrBody.push(body[td])
    HTMLTdBody = TrBody.map((td) => {
        const stringifyTdObject = JSON.stringify(td).replaceAll("{","").replaceAll("}","").replaceAll('"',"").replaceAll(",","<br>")
    if(typeof td !== "object"){return `<td>${td}</td>`}
    else {return `<td>${stringifyTdObject}</td>`}}).join("")

        }
        HTMLTrBody = `<tr>${HTMLTdBody}<tr>`
        HTMLAllBody += HTMLTrBody
        };
    return HTMLAllBody
}

function displayTodoPromise(json) {
    const newDiv = document.createElement("div")
    newDiv.classList = "table-container"
    newDiv.id = "result-table"
    const HTMLHeaders = createHeaderFromJson(json)
    const HTMLBodyData = createBodyDataFromJson(json)

   //console.log("json[0]",json[0])
  // console.log("json.length",json.length)
   newDiv.innerHTML = `
   <table id="table-view" class="table table-sm table-striped"><thead>
   ${HTMLHeaders}</thead>
   <tbody>
   ${HTMLBodyData}
   </tbody></table>
   `
    const tableReceiver = document.getElementById("table-receiver")

    console.log("tableReceiver",tableReceiver)
    console.log("newDiv",newDiv.innerHTML)
    tableReceiver.appendChild(newDiv)

}

// Ajout de Event sur le choix du type PlaceHolders à utiliser.

 document.querySelectorAll(".dropdown-item").forEach(itemButton => {

    itemButton.addEventListener("click",
    function(e){
        const clickSelection = e.target.textContent.toLowerCase()
    
loadSelection(loadData(clickSelection))
    
}
)
})

const searchInput = document.getElementById("search-input")

searchInput.addEventListener("input",function(e){
    const input = e.target.value
    console.log("input",input)
    sortTable(input)
})

 async function sortTable(input){

  const stringJson = await localStorage.getItem("freshJson")

    const json =  await JSON.parse(stringJson)

    const tableContainer = document.getElementById("result-table")

    const table = tableContainer.querySelector(".table-container")

    const searchInput = document.getElementById("search-input")

    const filteredJson =  await json.filter(function (fjson){
        console.log("json.filter(function",input === fjson.name)
        return input === fjson.name
    })

    console.log("filteredJson",filteredJson)
    loadSelection(displayTodoPromise(filteredJson))
}


function loadSelection(e){

    
   console.log()
    try{
        console.log("loadSelection",e)
        const tableContainer = document.getElementById("result-table")
        const tableReceiver = document.getElementById("table-receiver")
        console.log("tableContainer = ",tableContainer)
        const table = document.getElementById("result-table")
        console.log("table = ",table)
    if(table !== null){
        while (tableContainer.firstChild) {
            tableContainer.removeChild(tableContainer.lastChild);
          }
        console.log(`Replace Child de ${table} dans ${tableContainer} par nouvelle données.`)
        table.replaceWith(e)
      //  tableContainer.innerText = ""
   }
    else {
        console.log("Pas de table existante, données initiale chargées.")
       // tableReceiver.innerHTML = ""
        tableReceiver.innerText = ""
        displayTodoPromise(e)
    }
        tableReceiver.innerText = ""
        tableContainer.innerText = ""
        
}
    catch {(e) => console.log("erreur" + e)}

}
