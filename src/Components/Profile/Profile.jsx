import React, { useEffect, useState } from 'react';
import './Profile.css';
import authService from '../../routes/Auth';
import recipesApi from '../../routes/Recipe';
import getMealDetails from './getmealDetails';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserData = async () => {
        try {
            const data = await authService.getCurrentUser();
            if (data) {
                setUserData(data);
            } else {
                console.log("Error while getting user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getSavedRecipes = async () => {
        try {
            if (!userData) return; // Add null check
            const mealIds = await recipesApi.getSavedRecipe(userData.email);
            console.log(mealIds)
            const meals = await getMealDetails(mealIds);
            console.log(meals);
            setRecipes(meals); // Update state variable name
            setLoading(false);
        } catch (error) {
            console.error("Error fetching saved recipes:", error);
            setLoading(false);
        }
    };

    const viewRecipe = async (mealid) => {
        console.log(mealid);
        navigate(`/recipe/${mealid}`);
    }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            getSavedRecipes();
        }
    }, [userData]);

    return (
        <div className='Profile'>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="profile_info">
                        {/* Render user avatar if available */}
                        <img src={userData.avatarUrl} alt="user avatar" />
                        <h1 className='username'>{userData.username}</h1>
                        <h2 className='user_email'>{userData.email}</h2>
                    </div>


                    <div className='saved_recipe'>
                        <h2>Saved Recipes</h2>
                        <div className="recipe-list">
                            {recipes.map((recipe, index) => ( // Correct variable name
                                <div className="card-container" key={index}>
                                    <div className='meal'>
                                        <img src={recipe.imageUrl} className="meal-img" alt={recipe.title} />
                                    </div>
                                    <div className="meal-content">
                                        <div className="meal-tags">
                                            <span className="tag tag--vegetarian">{recipe.tags}</span> {/* Where is CurrentRecipe coming from? */}
                                        </div>
                                        <div className='meal_div'>
                                            <p className="meal-title">{recipe.title}</p>
                                        </div>
                                        {recipe.idMeal}
                                        <button className="view_recipe" role="button" onClick={() => viewRecipe(recipe.mealid)}>
                                            <span className="text">View Recipe</span><span>Let's Cook</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
