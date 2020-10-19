const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=150";


/**
 * Try to parse a response as JSON data
 */
function transformToJson(response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Veuillez racheter un ordinateur");
}

/**
 * Clear the list of all its items
 */
function emptyList() {
    list.innerHTML = "";
}

/**
 * Create an item, fetch its data and setup event listener
 */
function createItem(pokemon) {
    // Create a li tag  
    // 
    const item = document.createElement("li");
    
    const image = document.createElement("img");
    const name = document.createElement("p");

    list.appendChild(item);
    item.appendChild(image);
    item.appendChild(name);
    /**
     * item.addEventListener("click",showDescription);
     */
    fetch(pokemon.url).then(transformToJson).then((data) => {
        
        name.innerHTML = data.name;
        image.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;


        
        // console.log(data);

        item.addEventListener("click", ()=> { 
            showDescription(data);
        });

        

    });
}

/**
 * fill the item list with values
 */
function fillList(json) {
    emptyList();
    json.results.forEach(createItem);
}

/**
 * Fill and display the description
 */
function showDescription(data) {
    description.classList.add("show");
    //const descripName = document.querySelector(dd.name); 
    const id = document.querySelector("dd.id"); 
    const poids = document.querySelector("dd.weight"); 
    const hauteur = document.querySelector("dd.height"); 
    const types = document.querySelector("dd.types"); 
    
    id.innerHTML = data.id;
    poids.innerHTML = data.weight;
    hauteur.innerHTML = data.height;
   
    types.innerHTML = data.types;

    
    const fields = description.querySelectorAll("dd");
    // console.log(fields);
    fields.forEach((dd) => {
        const info = dd.className;
        dd.innerHTML = data[info];

    });
}

/**
 * Hide the description
 */
function hideDescription() {
    description.classList.remove("show");
}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);
