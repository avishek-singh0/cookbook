
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeList } from './RecipeList';

export const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://cookbackend-umfm.onrender.com/recipe/all');

        if (response.data.status === 'success') {
          setRecipes(response.data.data.recipes);
        } else {
          throw new Error(response.data.message || 'Failed to fetch recipes');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
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
      <RecipeList 
        recipes={recipes} 
        title="All Recipes" 
      />
    </div>
  );
};
