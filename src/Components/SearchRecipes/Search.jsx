import React, { useState } from 'react';
import SearchApi from '../../routes/Search'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';

function Search() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading state to true before making the API call
        try {
            const recipes = await SearchApi.name(searchTerm); // Make sure this method is correct
            setRecipes(recipes.data);
            setError(null); // Reset error state if API call succeeds
        } catch (error) {
            setError(error.message); // Set error state if API call fails
            setRecipes([]); // Clear recipes on error
        } finally {
            setLoading(false); // Set loading state back to false after API call
        }
    };

    const viewRecipe = async (mealId) => {
        navigate(`/recipe/${mealId}`);
    };

    return (

        <div>
            <div className='search'>
                <div className='input-box'>
                    <form className="form" onSubmit={handleSubmit}>
                        <input value={searchTerm} onChange={handleChange} placeholder="Search for recipes..." spellCheck="true" />
                        <button className="search__button button" >
                            <FontAwesomeIcon className="search__icon" icon={faSearch} />
                        </button>
                    </form>
                </div>
            </div>


            <div className='Search'>
                <h1>Recipes</h1>
                <div className="recipe-list">
                    {loading ? (
                        <Loading/>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : recipes.length === 0 ? (
                        <p>No recipes found</p>
                    ) : (
                        recipes.map((recipe, index) => (
                            <div className="card-container" key={index}>
                                <div className='meal'>
                                    <img src={recipe.strMealThumb} className="meal-img" alt={recipe.strMeal} />
                                </div>
                                <div className="meal-content">
                                    <div className='meal_div'>
                                        <p className="meal-title">{recipe.strMeal}</p>
                                    </div>
                                    <button class="view_recipe" role="button" onClick={() => viewRecipe(recipe.idMeal)}>
                                        <span class="text">View Recipe</span><span>Let's Cook</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
