const formatRecipeData = (recipeData) => {
  console.log(recipeData)
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strInstructions,
    strSource,
    strTags,
    strYoutube,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
  } = recipeData;

  const instructionsArray = strInstructions ? strInstructions.split(/\n\d+\./).filter(Boolean) : [];


  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeData[`strIngredient${i}`];
    const measure = recipeData[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  let youtubeEmbedUrl = '';
  if (strYoutube) {
    const videoId = strYoutube.match(/[?&]v=([^?&]+)/)[1];
    youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  return {
    mealid: idMeal,
    title: strMeal,
    imageUrl: strMealThumb,
    instructions: instructionsArray,
    source: strSource,
    tags: strTags,
    youtube: youtubeEmbedUrl,
    ingredients,
  };
};

export default formatRecipeData;
