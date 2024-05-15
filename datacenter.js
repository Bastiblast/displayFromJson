const types = [
  "posts",
  "comments",
  "albums",
  "photos",
  "todos",
  "users"
]

async function loadData(types, localJsonName) {
  try {
    console.log(`Téléchargement de la page https://jsonplaceholder.typicode.com/${types}...`);
    const data = await fetch(`https://jsonplaceholder.typicode.com/${types}`);
    const jsonData = await data.json();
    const jsonString = await JSON.stringify(jsonData);

    localStorage.setItem(localJsonName, jsonString);
    localStorage.setItem("filteredJson", null);

    return jsonData
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}
