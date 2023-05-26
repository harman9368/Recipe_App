const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get Recipes
const fetchRecips = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <P><span>${meal.strArea}</span> Dish</p>
          <P>Belongs to <span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListner to recipe button
        button.addEventListener('click', () =>{
            openRecipePopup(meal);
        })


        recipeContainer.appendChild(recipeDiv);
    });

}
catch (error) {
    recipeContainer.innerHTML = `
    <div class="error">
    <h2>Error in Fetching Recipes....</h2>
    <img src="error.jpg" width="500" height="500">
    </div>
    `;

    }
    //console.log(response.meals[0]);
}

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    //console.log(meal)
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingredientList">Ingredients:</h3>
    <ul>${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `

    
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box....</h2>`;
        
        return;
    }
    fetchRecips(searchInput);
   //console.log("Button Clicked");
   
})