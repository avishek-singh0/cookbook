// src/pages/RecipeDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://cookbackend-umfm.onrender.com/recipe/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(res.data);
      } catch (err) {
        console.error('Failed to load recipe:', err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <img src={recipe.thumbnail} alt={recipe.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold my-4 text-gray-800">{recipe.name}</h1>
      <p className="text-sm text-gray-500 mb-2">By {recipe.postedBy[0]?.name || 'Unknown'}</p>
      <p className="text-sm text-gray-500 mb-4">{new Date(recipe.postedAt).toLocaleDateString()}</p>
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Ingredients:</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Instructions:</h2>
      <div
        className="prose max-w-full text-gray-700"
        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
      />
    </div>
  );
};

export default RecipeDetail;
