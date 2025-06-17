import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import RichTextEditor from './QuillEditor';

import  QuillEditor  from './QuillEditor';
// Make sure this path is correct

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    instructions: '',
    thumbnail: '',
    ingredients: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null); // ref for recipe name + suggestions container
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(i => i.trim())
    };
     
 

    try {
      await axios.post('https://cookbackend-umfm.onrender.com/recipe/create', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Recipe created!');
      setRecipe({ name: '', instructions: '', thumbnail: '', ingredients: '' });
      setSuggestions([]);
    } catch (err) {
      console.error('Error creating recipe:', err);
      alert('Failed to create recipe.');
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (recipe.name.trim().length < 1) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe.name}`);
        const recipes = res.data.data.recipes;
        setSuggestions(recipes.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [recipe.name]);

  const handleSuggestionClick = (title) => {
    setRecipe((prev) => ({ ...prev, name: title }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md space-y-6 mb-6">
      <h2 className="text-white font-semibold text-lg">Add New Recipe</h2>

      {/* Recipe Name */}
      <div ref={containerRef} className="relative">
        <label className="text-white block mb-1 font-medium">Recipe Name</label>
        <input
          type="text"
          placeholder="Name of the Recipe"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
          required
          className="p-2 w-full rounded border border-black text-black"
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white text-black border border-gray-300 w-full rounded mt-1 max-h-40 overflow-y-auto">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onMouseDown={() => handleSuggestionClick(s.title)}
              >
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Instructions */}
      <QuillEditor
  value={recipe.instructions}
  onChange={(val) => setRecipe({ ...recipe, instructions: val })}
  placeholder="Write instructions here..."
/>

      {/* Thumbnail & Ingredients */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-white block mb-1 font-medium">Thumbnail URL</label>
          <input
            type="url"
            placeholder="Thumbnail URL"
            value={recipe.thumbnail}
            onChange={(e) => setRecipe({ ...recipe, thumbnail: e.target.value })}
            required
            className="p-2 w-full rounded border border-black text-black"
          />
        </div>
        <div>
          <label className="text-white block mb-1 font-medium">Ingredients</label>
          <input
            type="text"
            placeholder="Ingredients (comma-separated)"
            value={recipe.ingredients}
            onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
            required
            className="p-2 w-full rounded border border-black text-black"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateRecipe;
