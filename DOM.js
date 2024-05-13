/** Ajout de Event sur le choix du type PlaceHolders à utiliser.
 *  
 */ 
document.querySelectorAll(".dropdown-item").forEach(
    
    itemButton => {

        itemButton.addEventListener("click",

            async function(e){
            const clickSelection = e.target.textContent.toLowerCase()

            const json = await loadData(clickSelection,"freshJson")

            cleanAndFillContainer(createHTMLElementByJson(json),"table-receiver")
            }
        )
    }
)

/** Add Event listener on search input.
 * 
 */
const searchInput = document.getElementById("search-input")

searchInput.addEventListener("input",

    async function(e){
    const input = e.target.value
    json = await sortTable(input,"freshJson")
    cleanAndFillContainer(createHTMLElementByJson(json),"table-receiver")
    }
)

/** Add Event listener on Header to sort column
 * 
 */
async function listenOnThClick(target){
    document.querySelectorAll(target).forEach(
        async function (th){
            th.addEventListener("click",
                async function(e){

                    const filteredJsonString = await localStorage.getItem("filteredJson") 
                    const freshJsonString = await localStorage.getItem("freshJson")
                    let lastJsonString = {}

                    if(filteredJsonString !== "null") { lastJsonString = filteredJsonString 
                    }    
                    else{lastJsonString = freshJsonString}
                    
                    let lastJson = await JSON.parse(lastJsonString)
                    const selectedHeader = e.target.textContent
                   // console.log("e.target.classList.value = ",e.target.classList)
                    
                    switch (e.currentTarget.classList.value){
                        case "" :
                        console.log("switch case to empty classList")
                        lastJson = await lastJson.sort((a,b) => {
                            if(a[selectedHeader] < b[selectedHeader]){return -1}
                        })
                        cleanAndFillContainer(createHTMLElementByJson(lastJson),"table-receiver")
                        e.target.classList.add("sorted")  
                          
                        break                     
                        case "sorted" :
                        console.log("switch case to sorted classList")
                        console.log("e.target.classList = ",e.target.classList)
                        lastJson = await lastJson.sort((a,b) => {
                            if(a[selectedHeader] > b[selectedHeader]){return -1}
                        })
                        cleanAndFillContainer(createHTMLElementByJson(lastJson),"table-receiver")
                        e.target.classList.add("unsorted")  

                        break
                }
                console.log("e.target.classList.value = ",e.target.classList.value)

                

            }
            )
        }
    )
}

/** Create thead from a json in html format.
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
    } 
    else {
        for (const head in json[0]){
            headers.push(head)
        }
    }

const HTMLHeaders = headers.map((head) => `<th>${head}</th>` ).join("")

return HTMLHeaders
}

/** Create tbody from a json in html format.
 * 
 * @param {json} json 
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
    }

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

    newDiv.innerHTML = `
    <table id="table-view" class="table table-hover table-reponsive-sm"><thead>
    ${HTMLHeaders}</thead>
    <tbody>
    ${HTMLBodyData}
    </tbody></table>
    `

    return newDiv
}

/** Take string Input and Local Json name to filter the second by the first.
 * 
 * @param {string} input 
 * @param {string} localJsonName 
 * @returns 
 */
 async function sortTable(input,localJsonName){

  const stringJson = await localStorage.getItem(localJsonName)

    const json =  await JSON.parse(stringJson)

    const tableContainer = document.getElementById("result-table")

    const table = tableContainer.querySelector(".table-container")

    const searchInput = document.getElementById("search-input")

    const filteredJson =  await json.filter(function (fjson){
      //  console.log("json.filter(function",input === fjson.name)
      let isTrue = false
      for (let eachCol in fjson){
      //  console.log("fjson[eachCol] = ",fjson[eachCol])
      const objectElement = (typeof fjson[eachCol] === "object")? JSON.stringify(fjson[eachCol]):fjson[eachCol]
        const stringElement = objectElement.toString()
        const isStringPart = stringElement.toLowerCase().indexOf(input.toLowerCase()) >= 0
      
         if(isStringPart){
         isTrue = true}
    }
    return isTrue})
    
    await localStorage.setItem("filteredJson",JSON.stringify(filteredJson))
    console.log("filteredJson",filteredJson)
    return filteredJson
  
}

/** Clean a container and fill with a new Element.
 * 
 * @param {HTMLElement} element 
 * @param {string} receiverClassName 
 */
function cleanAndFillContainer(element,receiverClassName){

    try{

        const tableReceiver = document.getElementById(receiverClassName)
        const table = document.getElementById("result-table")

        if(table !== null){
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

    catch {(element) => console.log("erreur" + element)}

}

