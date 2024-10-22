import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import searchApi from '../../routes/Search';
import Container from '../Container/Container'
function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [CurrentRecipe, setCurrentRecipe] = useState('')

  const categories = [
    { name: 'Vegetarian', value: 'vegetarian' },
    { name: 'Non-Vegetarian', value: 'Chicken' },
    { name: 'Starters', value: 'Starter' },
    { name: 'Pasta', value: 'Pasta' },
    { name: 'Desserts', value: 'Dessert' }
  ];

  const fetchRecipes = async (category) => {
    setCurrentRecipe(category);
    setLoading(true);

    try {
      let fetchedRecipes = await searchApi.category(category);
      setRecipes(fetchedRecipes.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes('vegetarian');
  }, []);


  const viewRecipe = async (mealid) => {
    console.log(mealid);
    navigate(`/recipe/${mealid}`);
  }

  return (
    <Container>
      <div className='button-drawer'>
        <div className='button-container'>
          {/* Map over the categories array to render buttons */}
          {categories.map((category, index) => (
            <button className='button' key={index} onClick={() => fetchRecipes(category.value)}>
              {category.name}
            </button>
          ))}
        </div>
      </div>


      <div className="recipe-list">
        {loading ? (
          <Loading />
        ) : (
          recipes.map((recipe, index) => (
            <div className="card-container" key={index}>
              <div className='meal'>
                <img src={recipe.strMealThumb} className="meal-img" alt={recipe.strMeal} />
              </div>
              <div className="meal-content">
                <div className="meal-tags">
                  <span className={CurrentRecipe}>{CurrentRecipe}</span>
                </div>
                <div className='meal_div'>
                  <p className="meal-title">{recipe.strMeal}</p>
                </div>
                <button className="view_recipe" role="button" onClick={() => viewRecipe(recipe.idMeal)}>
                  <span className="text">View Recipe</span><span>Let's Cook</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}

export default Home;
