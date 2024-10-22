import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SearchApi from '../../routes/Search';
import formatRecipeData from './FormatRecipeData';

import './Recipe.css'; // Import CSS file
import authService from '../../routes/Auth';
import RecipesApi from '../../routes/Recipe';

function Recipe() {
  const { mealid } = useParams();
  const [recipe, setRecipe] = useState(null); // Initialize recipe state with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await SearchApi.id(mealid);
        if (recipeData.data.length === 0) {
          throw new Error('Recipe not found');
        }
        const formattedRecipe = formatRecipeData(recipeData.data[0]);
        setRecipe(formattedRecipe);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [mealid]);

  console.log(recipe);

  const handleSaveRecipe = useCallback(async () => {
    try {
      const userdata = await authService.getCurrentUser();
      const useremail = userdata.email;
      const id = recipe.mealid;
      await RecipesApi.saveRecipe(useremail, id);
      console.log('Recipe saved successfully');
    } catch (error) {
      console.error('Error saving recipe:', error.message);
    }
  }, [recipe]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="recipe-container">

      <h2 className="recipe-title">{recipe.title}</h2>

      <div className='recipe'>
        <div className="image">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </div>
        <div className='ingredients'>
          <h4 className="recipe-subtitle">Ingredients:</h4>
          {/* <h4>Checklist</h4> */}
          <div id='checklist'>
            {recipe.ingredients.map((item, index) => (
              <div className='index' key={index}>
                <input value={index} name="r" type="checkbox" id={index} />
                <label htmlFor={index}>{index + 1}. {item.ingredient} <span id='measure'> {item.measure}</span></label>
              </div>
            ))}
          </div>
        </div>
      </div>



      <h2 className="recipe-subtitle">Instructions:</h2>
      <ol className="recipe-instructions">
        {recipe.instructions.map((step, index) => (
          <div>
            <li key={index}>{step}</li>
          </div>
        ))}
      </ol>



      {recipe.youtube ? (
        <div className='video'>
          <iframe
            width="560"
            height="315"
            src={recipe.youtube}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <></>
      )}





      <button onClick={handleSaveRecipe} className="bookmarkBtn" aria-label="Save Recipe">
        <span className="IconContainer">
          <svg viewBox="0 0 384 512" height="0.9em" className="icon">
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
          </svg>
        </span>
        <p className="textbtn">Save</p>
      </button>
    </div >
  );
}

export default Recipe;
