import  SearchApi  from "../../routes/Search";
import formatRecipeData from "../Recipe/FormatRecipeData";

const getMealDetails=async(mealIds)=> {
    try {
        const mealDetailsArray = [];
        for (const id of mealIds) {
            const response = await SearchApi.id(id)
            const recipe=formatRecipeData(response.data[0])
            mealDetailsArray.push(recipe);
        }
        console.log(mealDetailsArray)
        return mealDetailsArray;
    } catch (error) {
        console.error("Error getting meal details:", error.message);
        throw new Error("Failed to get meal details");
    }
}

export default getMealDetails;


