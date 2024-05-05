function placeHolder(type,number){
  return `https://jsonplaceholder.typicode.com/${type}/${number}`
}
 

const loadData = async () => {
  try {
    const data = await fetch(placeHolder("users",""));
    const jsonData = await data.json();
    console.log("jsonData = ", jsonData)
   //  Modify DOM based on jsonData
    displayTodoPromise(jsonData)
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
