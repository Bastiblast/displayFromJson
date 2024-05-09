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
    const jsonString = JSON.stringify(json,null,4)
    const newDiv = document.createElement("div")
    newDiv.classList = "table-container"
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
   document.getElementById("table-receiver").append(newDiv)

}

// Ajout de Event sur le choix du type PlaceHolders à utiliser.

 document.querySelectorAll(".dropdown-item").forEach(itemButton => {

    itemButton.addEventListener("click",
    function(e){
     
       try{
        const tableContainer = document.getElementById("table-receiver")
        console.log("tableContainer = ",tableContainer)
        const table = tableContainer.querySelector(".table-container")
        console.log("table = ",table)
        const clickSelection = e.target.textContent.toLowerCase()
        
        console.log(`Sélection de la liste ${clickSelection}`)
   
        if(table !== null){
       
            const replace = table.remove() 
            console.log(`Replace Child de ${table} dans ${tableContainer} par nouvelle données.`)
            table.replaceWith(loadData(clickSelection))
            tableContainer.innerText = ""
       }
        else {
            console.log("Pas de table existante, données initiale chargées.")
            tableContainer.append(loadData(clickSelection))}
            tableContainer.innerText = ""
    }
        catch {(e) => console.log("erreur" + e)}
    
}
)
})

