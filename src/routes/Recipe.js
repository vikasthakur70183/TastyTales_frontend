import axios from 'axios';

export class RecipesApi {
    
    async saveRecipe(email, mealid) {
        try {
            const response = await axios.post('/api/save', { email, mealid });
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error saving recipe:", error.message);
            throw new Error("Failed to save recipe");
        }
    }
    async getSavedRecipe(email) {
        try {
            const response= await axios.post('/api/GetSavedRecipe',{email})
            console.log(response.data.savedRecipes);
            return response.data.savedRecipes;
        } catch (error) {
            console.error("Error getting recipe:", error.message);
            throw new Error("Failed to getting recipe");
        }
    }
}

const recipesApi = new RecipesApi();

export default recipesApi;
