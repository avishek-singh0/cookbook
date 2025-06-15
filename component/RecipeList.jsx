import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

export const RecipeList = ({
  recipes = [],
  title,
  onDelete,
  showDeleteButton = false,
}) => {
  
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  // ✅ Fetch user's favorites on mount
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('https://cookbackend-umfm.onrender.com/favorite/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const favIds = res.data.map((fav) => fav._id); // or fav.recipeId
      setFavorites(favIds);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // ✅ Toggle Favorite API
  const handleFavoriteToggle = async (recipeId) => {
    try {
      if (favorites.includes(recipeId)) {
        await axios.delete(`https://cookbackend-umfm.onrender.com/favorite/${recipeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          `https://cookbackend-umfm.onrender.com/favorite/${recipeId}`,
          { recipeId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchFavorites(); // refresh after update
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div className="py-4">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={recipe.thumbnail}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-600">{recipe.name}</h3>
              <p className="text-gray-600 mb-2">
                By {recipe.postedBy[0]?.name || 'Unknown'}
              </p>
              <h5 className="font-bold text-lg mb-2 text-gray-600">{new Date(recipe.postedAt).toLocaleDateString()}</h5>
              <div className="mb-3">
                <h4 className="font-medium text-sm text-gray-600">Ingredients:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <li>+{recipe.ingredients.length - 3} more</li>
                  )}
                </ul>
               
              </div>

              <div className="flex justify-between items-center mt-4  space-x-2">
                <button
                  onClick={() => handleFavoriteToggle(recipe._id)}
                  className={`w-6 h-6 transition-all duration-300 transform hover:scale-110 ${
                    favorites.includes(recipe._id)
                      ? 'text-red-600'
                      : 'text-gray-400'
                  }`}
                >
                  {favorites.includes(recipe._id) ? '❤️' : '🤍'}
                </button>

                 <button
             onClick={() => navigate(`/recipe/${recipe._id}`)}
            className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                     View
                     </button>
                  
                {showDeleteButton && onDelete && (
                  <button
                    onClick={() => onDelete(recipe._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                )}
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
