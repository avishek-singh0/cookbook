import { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeList } from './RecipeList';

export default function Favourite() {
  const token = localStorage.getItem('token');
  
  const [favorites, setFavorites] = useState([]);


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


  return (
    <div className="min-h-screen bg-gray-800 text-black p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Recipes ❤️</h2>
      {favorites.length > 0 ? (
        <RecipeList
          recipes={favorites}
          title="Favorites"
         
        />
      ) : (
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
}
