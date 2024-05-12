/**
 * 
 * @param {object} json 
 * @returns {string} HTML Header in string
 */
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

/**
 * 
 * @param {*} json 
 * @returns {string} HTML Body in string
 */
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

/**
 * 
 * @param {object} json 
 * @returns {Element} Return a div table of the given json.
 */
function createHTMLElementByJson(json) {
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
    //tableReceiver.appendChild(newDiv)
    return newDiv
}

// Ajout de Event sur le choix du type PlaceHolders à utiliser.

 document.querySelectorAll(".dropdown-item").forEach(itemButton => {

    itemButton.addEventListener("click",
    async function(e){
        const clickSelection = e.target.textContent.toLowerCase()

const json = await loadData(clickSelection)

//console.log("loadData(clickSelection) = ",loadData(clickSelection))
console.log("json = ",json)
loadSelection(createHTMLElementByJson(json))

}
)
})

const searchInput = document.getElementById("search-input")

searchInput.addEventListener("input",async function(e){
    const input = e.target.value
    console.log("input",input)
    json = await sortTable(input)
    loadSelection(createHTMLElementByJson(json))
})

 async function sortTable(input){

  const stringJson = await localStorage.getItem("freshJson")

    const json =  await JSON.parse(stringJson)

    const tableContainer = document.getElementById("result-table")

    const table = tableContainer.querySelector(".table-container")

    const searchInput = document.getElementById("search-input")

    const filteredJson =  await json.filter(function (fjson){
      //  console.log("json.filter(function",input === fjson.name)
      let isTrue = false
      for (let eachCol in fjson){
      //  console.log("fjson[eachCol] = ",fjson[eachCol])
        const stringElement = fjson[eachCol].toString()
        const isStringPart = stringElement.toLowerCase().indexOf(input.toLowerCase()) >= 0
        console.log("isStringPart = ",isStringPart)
      
         if(isStringPart){
         isTrue = true}
    }
    return isTrue})

    return filteredJson
    console.log("filteredJson",filteredJson)
}


function loadSelection(element){

    
   console.log()
    try{
        console.log("loadSelection",element)
        const tableContainer = document.getElementById("result-table")
        const tableReceiver = document.getElementById("table-receiver")
        console.log("tableContainer = ",tableContainer)
        const table = document.getElementById("result-table")
        console.log("table = ",table)
    if(table !== null){
        while (tableReceiver.firstChild) {
            console.log("Is Child ? ",tableReceiver.firstChild)
            tableReceiver.removeChild(tableReceiver.lastChild);
          }
        console.log(`Replace Child de ${table} dans ${tableContainer} par nouvelle données.`)
        
      //  tableContainer.innerText = ""
   }
    else {
        console.log("Pas de table existante, données initiale chargées.")
      
        
    } tableReceiver.appendChild(element)
        
        
}
    catch {(element) => console.log("erreur" + element)}

}
