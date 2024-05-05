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
    console.log("headers",headers)
   const HTMLHeaders = headers.map((head) => `<th>${head}</th>` ).join("")
console.log("HTMLHeaders",HTMLHeaders)
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
    HTMLTdBody = TrBody.map((td) => `<td>${td}</td>`).join("")

        }
        HTMLTrBody = `<tr>${HTMLTdBody}<tr>`
        HTMLAllBody += HTMLTrBody
        };
    return HTMLAllBody
}

function displayTodoPromise(json) {
    const jsonString = JSON.stringify(json,null,4)
   // console.log("jsonString",jsonString)
    const newDiv = document.createElement("div")
    const HTMLHeaders = createHeaderFromJson(json)
    const HTMLBodyData = createBodyDataFromJson(json)

   //console.log("json[0]",json[0])
  // console.log("json.length",json.length)
   newDiv.innerHTML = `
   <table><thead>
   ${HTMLHeaders}</thead>
   <tbody>
   ${HTMLBodyData}
   </tbody></table>
   `
   document.querySelector("body").append(newDiv)

}
//console.log(displayTodoPromise())
loadData()

