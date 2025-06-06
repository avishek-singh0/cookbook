import { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeList } from './RecipeList';

export default function Favourite() {
  const token = localStorage.getItem('token');
  // const [allRecipes, setAllRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fetch all recipes
  // const fetchAllRecipes = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5001/favorite/all', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setAllRecipes(res.data || []);
  //   } catch (error) {
  //     console.error('Error fetching all recipes:', error);
  //   }
  // };

  // Fetch favorite recipe IDs
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('https://cookbackend-umfm.onrender.com/favorite/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched favorites:', res.data);
      // const favIds = res.data.map((r) => r._id); 
      // console.log(favIds)// Adjust based on backend structure
      setFavorites(res.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    // fetchAllRecipes();
    fetchFavorites();
  }, []);

  // Toggle favorite
  // const handleFavoriteToggle = async (recipeId) => {
  //   try {
  //     if (favorites.includes(recipeId)) {
  //       await axios.delete(`http://localhost:5001/favorite/${recipeId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //     } else {
  //       await axios.post(
  //         `http://localhost:5001/favorite/${recipeId}`,
  //         { recipeId },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //     }
  //     fetchFavorites(); // Refresh favorites
  //   } catch (error) {
  //     console.error('Error toggling favorite:', error);
  //   }
  // };

  // Filter to only favorite recipes
  // const favoriteRecipes = favorites.filter((r) => favorites.includes(r._id));

  return (
    <div className="min-h-screen bg-gray-800 text-black p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Recipes ❤️</h2>
      {favorites.length > 0 ? (
        <RecipeList
          recipes={favorites}
          title="Favorites"
          // favorites={favorites}
          // onFavoriteToggle={handleFavoriteToggle}
        />
      ) : (
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
}
