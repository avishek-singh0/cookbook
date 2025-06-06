import { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeList } from './RecipeList'; // Your existing recipe card component
import CreateRecipe from './CreateRecipe';
import { AllRecipes } from './AllRecipes';
const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch user's recipes
  const fetchRecipes = async () => {
    try {
      const res = await axios.get('https://cookbackend-umfm.onrender.com/recipe/my-recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched recipes:', res.data);
      setMyRecipes(res.data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Delete a recipe by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/recipe/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
    
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
   {/* Create Recipe Component */}
  <CreateRecipe/>
        {/* Recipe List with Delete buttons */}
     <RecipeList
  recipes={myRecipes}
  title="My Recipes"
  onDelete={handleDelete}
  showDeleteButton={true}  // <-- delete button will show here
/>


        {myRecipes.length === 0 && (
          <p className="text-center py-10 text-gray-400">
            You haven't added any recipes yet.
          </p>
        )}
      </div>
    
    </div>
  
  );
};

export default MyRecipes;
