function placeHolder(type,number){
  return `https://jsonplaceholder.typicode.com/${type}/${number}`
}

const types = [
  "posts",
  "comments"	,
  "albums"	,
  "photos",
  "todos",
  "users"]

  async function loadData(types,localJsonName) {
    try {
      console.log(`Téléchargement de la page ${placeHolder(types,"")}.`)
      const data = await fetch(placeHolder(types,""));
      const jsonData = await data.json();
      const jsonString = await JSON.stringify(jsonData)
      await localStorage.setItem(localJsonName,jsonString)
    return jsonData
    } 
    catch (error) {
    return console.error('Error loading data:', error);
  }
}
