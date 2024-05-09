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

  async function loadData(types) {
  try {
    console.log(`Téléchargement de la page ${placeHolder(types,"")}.`)
    const data = await fetch(placeHolder(types,""));
    const jsonData = await data.json();
   //  Modify DOM based on jsonData
    displayTodoPromise(jsonData)
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
