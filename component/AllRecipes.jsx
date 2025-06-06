import { useState, useEffect } from 'react';
import { RecipeList } from './RecipeList';

export const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://cookbackend-umfm.onrender.com/recipe/all');
        const data = await response.json();
        
        if (data.status === 'success') {
          setRecipes(data.data.recipes);
        } else {
          throw new Error(data.message || 'Failed to fetch recipes');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);



  if (loading) return <div className="text-center py-10">Loading recipes...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
      
  return (
    <div>
      
      {/* // <h1 className="text-2xl font-bold text-center mb-6">All Recipes</h1> */}
       {/* <h2 className="text-xl text-center mb-4">Welcome, {rec}!</h2> */}
      <RecipeList 
        recipes={recipes} 
        title="All Recipes" 
        
      />
    </div>
  );
};